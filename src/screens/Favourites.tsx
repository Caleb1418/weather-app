import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MapPinIcon } from "react-native-heroicons/solid";
import * as Location from "expo-location"; // Import expo-location
import SearchBar from "~/components/SearchBar";
import WeatherCard from "~/components/WeatherCard";
import { weatherStore } from "~/stores/WeatherStore";
import { observer } from "mobx-react-lite";

const LocationScreen: React.FC = observer(() => {
  const navigation = useNavigation();
  const [showSearch, setShowSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(!weatherStore.initialized);
  const [currentLocationWeather, setCurrentLocationWeather] = useState<any>(null); // State for current location weather

  // Fetch current location and weather
  useEffect(() => {
    const fetchCurrentLocationWeather = async () => {
      try {
        // Request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Location permission denied");
          return;
        }

        // Get current location
        const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        const { latitude, longitude } = location.coords;

        // Fetch weather for current location
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=15f231a4c5493607e6ad5070b5c388da`
        );
        const data = await response.json();
        setCurrentLocationWeather(data); // Set current location weather
      } catch (error) {
        console.error("Error fetching current location weather:", error);
      }
    };

    fetchCurrentLocationWeather();
  }, []);

  // Ensure favorites are loaded
  useEffect(() => {
    if (!weatherStore.initialized) {
      const loadFavorites = async () => {
        await weatherStore.loadFavoritesFromStorage();
        setIsLoading(false);
      };
      loadFavorites();
    } else {
      setIsLoading(false);
    }
  }, [weatherStore.initialized]);

  console.log("Rendering LocationScreen, Favorites:", weatherStore.favorites);

  // Handle location selection
  const handleLocationSelect = (location: { name: string; lat: number; lon: number }) => {
    weatherStore.setSelectedLocation(location);
    navigation.navigate("Home" as never);
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-blue-900">
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-4 bg-blue-900">
      <SearchBar showSearch={showSearch} setShowSearch={setShowSearch} onLocationSelect={handleLocationSelect} />

      {/* Display current location weather */}
      <View className="mt-4">
        {currentLocationWeather ? (
          <WeatherCard
            location={currentLocationWeather.name}
            time="Now"
            highTemp={currentLocationWeather.main.temp_max}
            lowTemp={currentLocationWeather.main.temp_min}
            icon={currentLocationWeather.weather[0].icon}
            onPress={() => handleLocationSelect({
              name: currentLocationWeather.name,
              lat: currentLocationWeather.coord.lat,
              lon: currentLocationWeather.coord.lon
            })}
          />
        ) : (
          <Text className="text-white text-center">Loading current location weather...</Text>
        )}
      </View>

      {/* Display favorite locations */}
      <View className="mt-6">
        <Text className="text-white text-lg font-bold mb-4">Favorites</Text>
        {weatherStore.favorites.length > 0 ? (
          weatherStore.favorites.map((favorite, index) => (
            <TouchableOpacity
              key={`favorite-${favorite.name}-${index}`}
              className="flex-row items-center p-3 mb-2 bg-white/10 rounded-lg"
              onPress={() => handleLocationSelect(favorite)}
            >
              <MapPinIcon size={20} color="white" />
              <Text className="text-white ml-2 text-lg">{favorite.name}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text className="text-white/70 text-center italic">No favorites yet. Add locations by tapping the heart icon.</Text>
        )}
      </View>
    </ScrollView>
  );
});

export default LocationScreen;