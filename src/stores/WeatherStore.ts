import { makeAutoObservable, runInAction, reaction } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchCurrentWeather, fetchWeatherForecast } from "~/api/WeatherApi";

class WeatherStore {
  selectedLocation: { lat: number; lon: number } | null = null;
  currentWeather: any = null;
  forecastData: any = null;
  loading = false;
  error: string | null = null;
  favorites: Array<{ name: string; lat: number; lon: number }> = [];
  unit: "C" | "F" = "C"; // Default to Celsius
  initialized = false;

  constructor() {
    makeAutoObservable(this);
    
    // Immediately initialize favorites as an empty array
    this.favorites = [];
    
    // Initialize the store
    this.initialize();
    
    // Set up a reaction to save favorites whenever they change
    reaction(
      () => this.favorites.slice(), // Create a copy to track changes
      (favorites) => {
        console.log("Favorites changed, saving to AsyncStorage:", favorites);
        this.saveFavoritesToStorage();
      }
    );
  }

  async initialize() {
    try {
      // Load favorites first
      await this.loadFavoritesFromStorage();
      
      // Then load selected location
      await this.loadSelectedLocationFromStorage();
      
      runInAction(() => {
        this.initialized = true;
      });
    } catch (error) {
      console.error("Error initializing store:", error);
      runInAction(() => {
        this.initialized = true; // Still mark as initialized to prevent blocking the UI
      });
    }
  }

  // Toggle between Celsius and Fahrenheit
  toggleUnit() {
    this.unit = this.unit === "C" ? "F" : "C";
  }

  get convertedTemperature() {
    if (!this.currentWeather?.main?.temp) return null;
    return this.unit === "C" ? this.currentWeather.main.temp : (this.currentWeather.main.temp * 9) / 5 + 32;
  }

  // Load selected location from AsyncStorage
  async loadSelectedLocationFromStorage() {
    try {
      const savedLocation = await AsyncStorage.getItem("selectedLocation");
      if (savedLocation) {
        const location = JSON.parse(savedLocation);
        runInAction(() => {
          this.selectedLocation = location;
        });
        await this.fetchWeatherData();
      }
    } catch (error) {
      console.error("Error loading selected location:", error);
    }
  }

  // Load favorites from AsyncStorage
  async loadFavoritesFromStorage() {
    try {
      const savedFavorites = await AsyncStorage.getItem("favorites");
      console.log("Loaded Favorites from AsyncStorage:", savedFavorites);
      
      if (savedFavorites) {
        const favoritesArray = JSON.parse(savedFavorites);
        if (Array.isArray(favoritesArray)) {
          runInAction(() => {
            this.favorites = favoritesArray;
            console.log("Favorites set to:", this.favorites);
          });
        } else {
          runInAction(() => {
            this.favorites = [];
            console.log("Favorites reset to empty array because stored data wasn't an array");
          });
        }
      } else {
        runInAction(() => {
          this.favorites = [];
          console.log("No favorites in storage, using empty array");
        });
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
      runInAction(() => {
        this.favorites = [];
      });
    }
  }
  
  // Save favorites to AsyncStorage
  async saveFavoritesToStorage() {
    try {
      if (!Array.isArray(this.favorites)) {
        console.warn("Favorites is not an array when trying to save");
        return;
      }
      
      console.log("Saving Favorites to AsyncStorage:", this.favorites);
      await AsyncStorage.setItem("favorites", JSON.stringify(this.favorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  }

  // Add location to favorites
  addFavorite(location: { name: string; lat: number; lon: number }) {
    console.log("Adding Favorite:", location);
    
    // Ensure favorites is an array
    if (!Array.isArray(this.favorites)) {
      console.warn("Favorites was not an array when adding, resetting to empty array");
      runInAction(() => {
        this.favorites = [];
      });
    }
    
    // Check if location is already in favorites
    if (!this.favorites.some(fav => fav.name === location.name)) {
      runInAction(() => {
        this.favorites = [location, ...this.favorites];
        console.log("After adding favorite, favorites are now:", this.favorites);
      });
    }
  }

  // Remove location from favorites
  removeFavorite(locationName: string) {
    console.log("Removing Favorite:", locationName);
    
    // Ensure favorites is an array
    if (!Array.isArray(this.favorites)) {
      console.warn("Favorites was not an array when removing, resetting to empty array");
      runInAction(() => {
        this.favorites = [];
      });
      return;
    }
    
    runInAction(() => {
      this.favorites = this.favorites.filter(fav => fav.name !== locationName);
      console.log("After removing favorite, favorites are now:", this.favorites);
    });
  }

  // Check if a location is in favorites
  isFavorite(locationName: string) {
    // Ensure favorites is an array
    if (!Array.isArray(this.favorites)) {
      console.log("Favorites is not an array when checking:", locationName);
      return false;
    }
    
    const result = this.favorites.some(fav => fav.name === locationName);
    console.log("Is Favorite check for", locationName, ":", result);
    return result;
  }

  // Fetch weather data for the selected location
  async fetchWeatherData() {
    if (!this.selectedLocation) return;

    runInAction(() => {
      this.loading = true;
      this.error = null;
    });
    
    try {
      const [currentWeather, forecastData] = await Promise.all([
        fetchCurrentWeather(this.selectedLocation.lat, this.selectedLocation.lon),
        fetchWeatherForecast(this.selectedLocation.lat, this.selectedLocation.lon),
      ]);
      
      runInAction(() => {
        this.currentWeather = currentWeather;
        this.forecastData = forecastData;
      });
    } catch (error: any) {
      runInAction(() => {
        this.error = error.message;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  // Set selected location and fetch weather data
  async setSelectedLocation(location: { name: string; lat: number; lon: number }) {
    const locationData = { lat: location.lat, lon: location.lon };
    
    runInAction(() => {
      this.selectedLocation = locationData;
    });
    
    try {
      await AsyncStorage.setItem("selectedLocation", JSON.stringify(locationData));
      await this.fetchWeatherData();
    } catch (error) {
      console.error("Error saving selected location:", error);
    }
  }
}

// Create and export a single instance of the store
export const weatherStore = new WeatherStore();