import { getWeatherData } from "@/api";
import { createContext, useContext, useState, useEffect } from "react";

const WeatherContext = createContext(null);

export const useWeather = () => {
  return useContext(WeatherContext);
};

export const WeatherProvider = ({ children, storageKey = "Weather-App" }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(
    () => localStorage.getItem(storageKey) || "Raipur",
  );

  useEffect(() => {
    if (!city) return;
    setCity(localStorage.setItem(storageKey, city));
  }, [city]);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError("");
      try {
        //fetching data
        const data = await getWeatherData(city);
        const { mintemp_c, maxtemp_c } = data.forecast.forecastday[0].day;
        setWeatherData({
          current: { ...data.current, mintemp_c, maxtemp_c },
          condition: data.current.condition,
          hourly: data.forecast.forecastday[0].hour,
          weekly: data.forecast.forecastday.slice(1),
          location: data.location,
        });
      } catch (e) {
        setError("Error", e);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);

  const formatHour = (timeString) => {
    const date = new Date(timeString.replace(" ", "T"));
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  return (
    <WeatherContext.Provider
      value={{
        loading,
        setLoading,
        error,
        setError,
        weatherData,
        setWeatherData,
        city,
        setCity,
        formatHour,
        formatDay,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
