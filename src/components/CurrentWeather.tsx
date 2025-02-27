import React, { useEffect } from "react";
import { Image, Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { SunIcon, ArrowsRightLeftIcon, HeartIcon } from "react-native-heroicons/outline";
import { observer } from "mobx-react-lite";
import { weatherStore } from "~/stores/WeatherStore";

const CurrentWeather: React.FC = observer(() => {
  const { currentWeather, loading, error, unit, convertedTemperature, initialized } = weatherStore;

  // Format time helper
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Handle favorite toggle
  const handleFavoriteToggle = () => {
    if (!currentWeather || !currentWeather.name) {
      console.log("Cannot toggle favorite: currentWeather is missing data");
      return;
    }
    
    console.log("Toggling Favorite for:", currentWeather.name);
    
    if (weatherStore.isFavorite(currentWeather.name)) {
      weatherStore.removeFavorite(currentWeather.name);
    } else {
      weatherStore.addFavorite({
        name: currentWeather.name,
        lat: currentWeather.coord.lat,
        lon: currentWeather.coord.lon,
      });
    }
  };

  // If store isn't initialized yet
  if (!initialized) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="white" />
        <Text className="text-white mt-2">Loading data...</Text>
      </View>
    );
  }

  // Loading and error states
  if (loading) return <ActivityIndicator size="large" color="white" />;
  if (error) return <Text className="text-white">Error: {error}</Text>;

  // Check if data is defined and has the expected structure
  if (!currentWeather || !currentWeather.name || !currentWeather.weather?.[0] || !currentWeather.main || !currentWeather.sys) {
    return <Text className="text-white">No weather data available</Text>;
  }

  // Check if the current location is favorited
  const isFavorited = weatherStore.isFavorite(currentWeather.name);
  console.log(`Current location ${currentWeather.name} is favorited: ${isFavorited}`);

  return (
    <View className="mx-4 flex justify-around flex-1 mb-1">
      {/* Favorite and Unit Toggle Buttons (Top-Right) */}
      <View className="absolute top-4 right-4 z-50 flex-row space-x-2">
        {/* Favorite Button */}
        <TouchableOpacity
          onPress={handleFavoriteToggle}
          className="bg-white/20 p-2 rounded-full mr-5"
        >
          <HeartIcon
            size={24}
            color={isFavorited ? "red" : "white"}
          />
        </TouchableOpacity>

        {/* Unit Toggle Button */}
        <TouchableOpacity
          onPress={() => weatherStore.toggleUnit()}
          className="bg-white/20 p-2 rounded-full"
        >
          <ArrowsRightLeftIcon size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Location and Country */}
      <Text className="text-white text-center text-2xl font-bold mt-12">
        {currentWeather.name}, <Text className="text-lg font-semibold text-gray-300">{currentWeather.sys.country}</Text>
      </Text>

      {/* Weather Icon */}
      <View className="flex-row justify-center">
        <Image
          source={{ uri: `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png` }}
          className="w-32 h-32"
        />
      </View>

      {/* Temperature and Weather Description */}
      <View className="space-y-2">
        <Text className="text-center font-bold text-white text-6xl ml-5">
          {convertedTemperature !== null ? Math.round(convertedTemperature) : "N/A"}°{unit}
        </Text>
        <Text className="text-center font-bold text-white text-xl tracking-widest">
          {currentWeather.weather[0].description}
        </Text>
      </View>

      {/* Additional Weather Details */}
      <View className="flex-row justify-between mx-4">
        <View className="flex-row space-x-2 items-center">
          <Image source={require("../../assets/images/wind.png")} className="w-10 h-10" />
          <Text className="text-white font-semibold text-base">{currentWeather.wind.speed} km/h</Text>
        </View>
        <View className="flex-row space-x-2 items-center">
          <Image source={require("../../assets/images/Humidity.png")} className="w-7 h-7 pr-2" tintColor={"white"} />
          <Text className="text-white font-semibold text-base pl-2">{currentWeather.main.humidity}%</Text>
        </View>
        <View className="flex-row space-x-2 items-center">
          <SunIcon size={30} color={"white"} />
          <Text className="text-white font-semibold text-base pl-1">{formatTime(currentWeather.sys.sunrise)}</Text>
        </View>
      </View>
    </View>
  );
});

export default CurrentWeather;