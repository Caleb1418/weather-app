import axios from "axios";
import {API_KEY} from '@env'

const apiClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: {
    appid: API_KEY, 
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
  return response.data.list.slice(0, 8);
};