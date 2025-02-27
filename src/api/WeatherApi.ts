import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: {
    appid: "15f231a4c5493607e6ad5070b5c388da", 
    units: "metric",
  },
});

// Fetch 5-day weather forecast
export const fetchWeatherForecast = async (latitude: number, longitude: number) => {
  const response = await apiClient.get("/forecast", {
    params: {
      lat: latitude,
      lon: longitude,
    },
  });
  return response.data;
};
  
  // Fetch current weather data
  export const fetchCurrentWeather = async (latitude: number, longitude: number) => {
    const response = await apiClient.get("/weather", {
      params: {
        lat: latitude,
        lon: longitude,
      },
    });
    return response.data;
  };
 // Fetch 3-hour forecast data (for the next 24 hours)
export const fetchHourlyWeather = async (latitude: number, longitude: number) => {
  const response = await apiClient.get("/forecast", {
    params: {
      lat: latitude,
      lon: longitude,
    },
  });
  return response.data.list.slice(0, 8); // Return the next 24 hours (8 x 3-hour intervals)
};