import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "~/components/SearchBar";
import WeatherCard from "~/components/WeatherCard";
import { weatherStore } from "~/stores/WeatherStore";

const LocationScreen: React.FC = () => {
  const navigation = useNavigation();
  const [showSearch, setShowSearch] = useState(false);

  // Handle location selection
  const handleLocationSelect = (location: { name: string; lat: number; lon: number }) => {
    weatherStore.setSelectedLocation({ lat: location.lat, lon: location.lon });
    navigation.navigate("Home" as never);
  };

  return (
    <ScrollView className="flex-1 p-4 bg-blue-900">
      <SearchBar showSearch={showSearch} setShowSearch={setShowSearch} onLocationSelect={handleLocationSelect} />

      {/* Display current location weather (optional) */}
      <View className="mt-4">
        <WeatherCard
          location="Current Location"
          time="Now"
          highTemp={25} // Replace with actual data
          lowTemp={15} // Replace with actual data
          icon="01d" // Replace with actual data
        />
      </View>
    </ScrollView>
  );
};

export default LocationScreen;