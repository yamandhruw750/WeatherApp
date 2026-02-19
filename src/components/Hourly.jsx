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
      if (!activeRef.current || !containerRef.current) return;

      const container = containerRef.current;
      const activeCard = activeRef.current;

      const scrollPosition =
        activeCard.offsetLeft -
        container.offsetWidth / 2 +
        activeCard.offsetWidth / 2;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
        inline: "center"
      });
    }
  }, [hourly]);

  return (
    <div className="overflow-hidden">
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth py-4 justify-around no-scrollbar span-x snap-mandatory"
      >
        {hourly.map((item, index) => {
          const hour = new Date(item.time).getHours();
          const isActive = hour === currentHour;
          return (
            <Card
              key={index}
              ref={isActive ? activeRef : null}
              className={`min-w-40 flex-strink-0 snap-center rounded-2xl shadow-md transform transition-all duration-300 ${isActive ? "bg-blue-200 text-gray-800 z-20" : "scale-95 opacity-70"} `}
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
    </div>
  );
};

export default HourlyForecast;
