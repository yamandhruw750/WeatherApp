import React from "react";
import { ThermometerIcon } from "./ui/thermometer";
import { DropletIcon } from "./ui/droplet";
import { WindIcon } from "./ui/wind";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { useWeather } from "@/context/weatherContext";
import HourlyForecast from "./Hourly";
import WeeklyForecast from "./Weekly";

function MainCard() {
  const { weatherData, formatHour, formatDay } = useWeather();

  if (!weatherData) return null;

  const {
    location: { name, localtime, region },
    current: { temp_c, wind_kph, humidity, mintemp_c, maxtemp_c },
    condition: { text },
  } = weatherData;

  return (
    <div>
      <Card className="m-auto container mt-10">
        <CardHeader className="flex justify-between py-4 ">
          <CardTitle>
            <span className="flex gap-1.5 items-center">
              <MapPin />
              {name},<span className="font-light">{region}</span>
            </span>
          </CardTitle>
          <CardDescription>{formatHour(localtime)}</CardDescription>
        </CardHeader>
        <div className="m-auto grid grid-row-1">
          <Card className="w-sm flex items-center justify-center relative px-4 m-auto">
            <h2 className="font-semibold text-xl w-full text-left">
              {formatDay(localtime)}
            </h2>
            <h1 className="text-9xl  relative pr-14 ">
              <span className="absolute top-24 -left-8">
                <ThermometerIcon />
              </span>
              {temp_c.toFixed(0)}
              <span className="text-6xl  absolute top-2 right-0 ">°C</span>
              <div className="text-4xl text-center mt-6 m-auto ">{text}</div>
            </h1>

            <div className="relative flex space-x-6 items-center justify-around  w-full py-4 rounded-xl">
              <h2>
                <WindIcon />
                {wind_kph.toFixed(0)}KmH
              </h2>

              <h2>
                <DropletIcon />
                {humidity}
              </h2>
              <h2>
                <ChevronDown />
                {mintemp_c}°C
              </h2>
              <h2>
                <ChevronUp />
                {maxtemp_c}°C
              </h2>
            </div>
          </Card>
          <div className="mt-10">
            <WeeklyForecast weekly={weatherData.weekly} />
          </div>
        </div>
        <CardFooter>
          <div className="flex-col mt-20  w-full justify-center items-center gap-2 ">
            <HourlyForecast hourly={weatherData.hourly} />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default MainCard;
