const api_key = import.meta.env.VITE_OPENWEATHER_API_KEY;
const API_BASE_URL = "https://api.weatherapi.com/v1/forecast.json?";

export const getWeatherData = async (cityName) => {
  if (!cityName) return;
  try {
    const url = `${API_BASE_URL}key=${api_key}&q=${cityName}&days=6&aqi=no`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};
