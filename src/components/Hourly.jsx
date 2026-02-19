import { Card, CardContent } from "@/components/ui/card";
import { Droplets } from "lucide-react";
import { useWeather } from "@/context/weatherContext";
import { useEffect, useRef } from "react";

const HourlyForecast = ({ hourly }) => {
  const { formatHour } = useWeather();
  const currentHour = new Date().getHours();
  const containerRef = useRef(null);
  const activeRef = useRef(null);

  useEffect(() => {
    if (hourly.length > 0) {
      activeRef.current?.scrollIntoView({
        behavior: "smooth",
        inline: "start",
      });
    }
  }, [hourly]);

  return (
    <div
      ref={containerRef}
      className="flex gap-4 overflow-x-auto scroll-auto py-4 justify-around"
    >
      {hourly.map((item, index) => {
        const hour = new Date(item.time).getHours();
        const isActive = hour === currentHour;
        return (
          <Card
            key={index}
            ref={isActive ? activeRef : null}
            className={`min-w-40 rounded-2xl shadow-md ${isActive ? "bg-blue-200 text-gray-800 index-50" : ""} `}
          >
            <CardContent className="flex flex-col items-center space-y-0.5">
              {/* Icon */}
              <img
                src={item.condition.icon}
                alt={item.condition.text}
                className="w-16 h-16"
              />

              <p className="text-sm text-muted-foreground">
                {formatHour(item.time)}
              </p>

              {/* Temperature */}
              <p className="text-3xl font-semibold">
                {Math.round(item.temp_c)}°C
              </p>
              <p className="flex gap-2">
                <Droplets />
                {item.humidity}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default HourlyForecast;
