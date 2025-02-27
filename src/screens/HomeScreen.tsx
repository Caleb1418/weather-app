import React from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import CurrentWeather from "~/components/CurrentWeather";
import { CalendarDaysIcon } from "react-native-heroicons/outline";
import ForecastCard from "~/components/ForecastCard";
import HourlyWeather from "~/components/HourlyWeather"; // Import the HourlyWeather component

const HomeScreen: React.FC = () => {
  // Example latitude and longitude (replace with dynamic values if needed)
  const latitude = 37.7749; // Example latitude (San Francisco)
  const longitude = -122.4194; // Example longitude (San Francisco)

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        blurRadius={10}
        source={require("../../assets/images/background.png")}
        className="absolute h-full w-full"
      />
      <SafeAreaView className="flex-1 flex pt-24">
        <CurrentWeather />

        {/* Add HourlyWeather component here */}
        <HourlyWeather latitude={latitude} longitude={longitude} />

        {/* 5-Day Forecast Section */}
        <View className="mb-5 space-y-3">
          <View className="flex-row items-center mx-5 space-x-2 mb-2">
            <CalendarDaysIcon size={20} color={"white"} />
            <Text className="text-white text-base">5 day forecast</Text>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={{ paddingHorizontal: 15 }}
            showsHorizontalScrollIndicator={false}
          >
            <ForecastCard />
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;