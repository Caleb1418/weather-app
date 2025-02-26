import React from "react";
import { View, Text, Image } from "react-native";

interface WeatherCardProps {
  location: string;
  time: string;
  highTemp: number;
  lowTemp: number;
  icon: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ location, time, highTemp, lowTemp, icon }) => {
  return (
    <View className="bg-white/20 rounded-2xl p-6 shadow-lg">
      <Text className="text-white text-2xl font-bold">{location}</Text>
      <Text className="text-white text-lg mt-2">{time}</Text>

      <View className="flex-row items-center justify-between mt-4">
        <Image source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }} className="w-16 h-16" />
        <View className="flex-col items-end">
          <Text className="text-white text-xl">High: {Math.round(highTemp)}°C</Text>
          <Text className="text-white text-xl">Low: {Math.round(lowTemp)}°C</Text>
        </View>
      </View>
    </View>
  );
};

export default WeatherCard;