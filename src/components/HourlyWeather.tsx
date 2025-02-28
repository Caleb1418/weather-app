import React, { useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator, Image } from "react-native";
import { observer } from "mobx-react-lite";
import { weatherStore } from "~/stores/WeatherStore";
import { formatTime } from "~/utils";

const HourlyWeather: React.FC = observer(() => {
  const { selectedLocation, forecastData, loading, error } = weatherStore;

  // If no location is selected, don't render anything
  if (!selectedLocation) {
    return null;
  }

  // Loading state
  if (loading) {
    return (
      <View className="items-center justify-center p-4">
        <ActivityIndicator size="small" color="white" />
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View className="items-center justify-center p-4">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  // Check if data is defined and has the expected structure
  if (!forecastData || !forecastData.list) {
    return (
      <View className="items-center justify-center p-4">
        <Text className="text-white">No hourly data available</Text>
      </View>
    );
  }

  // Get the next 24 hours of data (8 x 3-hour intervals)
  const hourlyData = forecastData.list.slice(0, 8);



  return (
    <View className="my-4">
      <Text className="text-white text-lg font-bold mb-2">3-Hour Forecast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {hourlyData.map((hour: any, index: number) => (
          <View
            key={index}
            className="items-center justify-center bg-white/20 rounded-lg p-3 mx-2"
          >
            <Text className="text-white text-sm">{formatTime(hour.dt)}</Text>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`,
              }}
              className="w-12 h-12"
            />
            <Text className="text-white text-sm">{Math.round(hour.main.temp)}°C</Text>
            <Text className="text-white text-xs text-center">
              {hour.weather[0].description}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
});

export default HourlyWeather;