import { Card, CardContent } from "@/components/ui/card";
import { Droplets } from "lucide-react";
import { useWeather } from "@/context/weatherContext";

const HourlyForecast = ({ hourly }) => {
  const { formatHour } = useWeather();
  return (
    <div className="flex gap-4 overflow-x-auto py-4 justify-around">
      {hourly.slice(0, 12).map((item, index) => (
        <Card key={index} className="min-w-40 rounded-2xl shadow-md">
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
      ))}
    </div>
  );
};

export default HourlyForecast;
