import React from "react";
import { Image, SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon, CalendarDaysIcon } from "react-native-heroicons/outline";
import CurrentWeather from "~/components/CurrentWeather";
import ForecastCard from "~/components/ForecastCard";
import HourlyWeather from "~/components/HourlyWeather";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        blurRadius={10}
        source={require("../../assets/images/background.png")}
        className="absolute h-full w-full"
      />
      <SafeAreaView className="flex-1 flex pt-24">
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Location" as never)}
          className="absolute top-20 left-4 z-50 bg-white/20 p-2 rounded-full"
        >
          <ArrowLeftIcon size={24} color="white" />
        </TouchableOpacity>

        <CurrentWeather />

        {/* Hourly Weather Section */}
        <HourlyWeather />

        {/* 5-Day Forecast Section */}
        <View className="mb-5 space-y-3">
          <View className="flex-row items-center mx-5 space-x-2 mb-2">
            <CalendarDaysIcon size={20} color={"white"} />
            <Text className="text-white text-base">5 day forecast</Text>
          </View>
          {/* Remove the ScrollView and directly use ForecastCard */}
          <ForecastCard />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;