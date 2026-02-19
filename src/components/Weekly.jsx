import { Card, CardContent } from "@/components/ui/card";
import { useWeather } from "@/context/weatherContext";

const WeeklyForecast = ({ weekly }) => {
  const { formatDay } = useWeather();
  if (!weekly) return null;

  return (
    <div className="grid grid-cols-3 gap-2">
      {weekly.map((day, index) => (
        <Card key={index} className="rounded-2xl shadow-md">
          <CardContent className="flex-col-reverse items-center justify-between p-6">
            {/* Day */}
            <p className="font-semibold w-16 text-xl">{formatDay(day.date)}</p>

            {/* Icon + Condition */}
            <div className="flex items-center gap-3 ">
              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
                className="w-16 h-16"
              />
              <span className="text-sm text-muted-foreground hidden sm:block">
                {day.day.condition.text}
              </span>
            </div>

            {/* Min / Max Temp */}
            <div className="flex gap-4 font-semibold">
              <span>{Math.round(day.day.maxtemp_c)}°</span>
              <span className="text-muted-foreground">
                {Math.round(day.day.mintemp_c)}°
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WeeklyForecast;
