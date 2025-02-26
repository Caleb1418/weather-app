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
  // export const reverseGeocode = async (latitude: number, longitude: number) => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=15f231a4c5493607e6ad5070b5c388da`
  //     );
  //     console.log("Reverse geocoding response:", response.data); // Log response
  //     if (response.data && response.data.length > 0) {
  //       return { latitude, longitude }; // Return the coordinates
  //     }
  //   } catch (error) {
  //     console.log("Reverse geocoding error:", error); // Log error
  //   }
  //   return null;
  // };