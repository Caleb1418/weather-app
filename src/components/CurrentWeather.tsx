import React, { useEffect } from "react";
import { Image, Text, View, ActivityIndicator } from "react-native";
import { SunIcon } from "react-native-heroicons/outline";
import { observer } from "mobx-react-lite";
import { weatherStore } from "~/stores/WeatherStore";

const CurrentWeather: React.FC = observer(() => {
  const { currentWeather, loading, error } = weatherStore;

  // Helper function to format time
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Loading and error states
  if (loading) return <ActivityIndicator size="large" color="white" />;
  if (error) return <Text className="text-white">Error: {error}</Text>;

  // Check if data is defined and has the expected structure
  if (!currentWeather || !currentWeather.name || !currentWeather.weather || !currentWeather.main || !currentWeather.sys) {
    return <Text className="text-white">No weather data available</Text>;
  }

  return (
    <View className="mx-4 flex justify-around flex-1 mb-1">
      <Text className="text-white text-center text-2xl font-bold">
        {currentWeather.name}, <Text className="text-lg font-semibold text-gray-300">{currentWeather.sys.country}</Text>
      </Text>
      <View className="flex-row justify-center">
        <Image
          source={{ uri: `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png` }}
          className="w-32 h-32"
        />
      </View>
      <View className="space-y-2">
        <Text className="text-center font-bold text-white text-6xl ml-5">{Math.round(currentWeather.main.temp)}°C</Text>
        <Text className="text-center font-bold text-white text-xl tracking-widest">{currentWeather.weather[0].description}</Text>
      </View>
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