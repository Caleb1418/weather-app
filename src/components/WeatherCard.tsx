import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { WeatherCardProps } from "~/types/module";



const WeatherCard: React.FC<WeatherCardProps> = ({ location, time, highTemp, lowTemp, icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View className="bg-white/20 rounded-2xl p-6 shadow-lg">
        <Text className="text-white text-2xl font-bold">{location}</Text>
        <Text className="text-white text-lg mt-2">{time}</Text>

        <View className="flex-row items-center justify-between mt-4">
          <Image
            source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
            className="w-16 h-16"
          />
          <View className="flex-col items-end">
            <Text className="text-white text-xl">High: {Math.round(highTemp)}°C</Text>
            <Text className="text-white text-xl">Low: {Math.round(lowTemp)}°C</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WeatherCard;