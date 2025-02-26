import { makeAutoObservable } from "mobx";
import { fetchCurrentWeather, fetchWeatherForecast } from "~/api/WeatherApi";

class WeatherStore {
  selectedLocation: { lat: number; lon: number } | null = null;
  currentWeather: any = null;
  forecastData: any = null;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Fetch current weather data
  async fetchCurrentWeather(lat: number, lon: number) {
    this.loading = true;
    this.error = null;
    try {
      const data = await fetchCurrentWeather(lat, lon);
      this.currentWeather = data;
    } catch (error: any) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  }

  // Fetch weather forecast data
  async fetchWeatherForecast(lat: number, lon: number) {
    this.loading = true;
    this.error = null;
    try {
      const data = await fetchWeatherForecast(lat, lon);
      this.forecastData = data;
    } catch (error: any) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  }

  // Set selected location and fetch weather data
  setSelectedLocation(location: { lat: number; lon: number }) {
    this.selectedLocation = location;
    this.fetchCurrentWeather(location.lat, location.lon);
    this.fetchWeatherForecast(location.lat, location.lon);
  }
}

// Create a singleton instance of the store
export const weatherStore = new WeatherStore();