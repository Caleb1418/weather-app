import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { theme } from "~/theme";
import axios from "axios";

interface SearchBarProps {
  showSearch: boolean;
  setShowSearch: (show: boolean) => void;
  onLocationSelect: (location: { name: string; lat: number; lon: number }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ showSearch, setShowSearch, onLocationSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState<{ name: string; lat: number; lon: number }[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch locations based on search query
  const fetchLocations = async (query: string) => {
    if (!query) {
      setLocations([]);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=15f231a4c5493607e6ad5070b5c388da`
      );
      setLocations(response.data.map((loc: any) => ({ name: loc.name, lat: loc.lat, lon: loc.lon })));
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle location selection
  const handleLocationPress = (location: { name: string; lat: number; lon: number }) => {
    onLocationSelect(location);
    setShowSearch(false);
    setSearchQuery("");
    setLocations([]);
  };

  return (
    <View className="mx-4 relative z-50">
      <View
        className="flex-row items-center justify-end rounded-full overflow-hidden"
        style={{
          backgroundColor: showSearch ? theme.bgWhite(0.3) : "transparent",
        }}
      >
        {showSearch ? (
          <TextInput
            placeholder="Find a city"
            placeholderTextColor={"lightgray"}
            className="pl-6 h-15 text-white flex-1 text-base"
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              fetchLocations(text);
            }}
          />
        ) : null}

        <TouchableOpacity
          style={{ backgroundColor: theme.bgWhite(0.2) }}
          className="rounded-full p-3 m-1"
          onPress={() => setShowSearch(!showSearch)}
        >
          <MagnifyingGlassIcon size={28} color={"white"} />
        </TouchableOpacity>
      </View>

      {showSearch && (
        <View className="absolute w-full bg-gray-300 top-16 z-50 rounded-3xl">
          {loading ? (
            <ActivityIndicator size="small" color="black" className="p-3" />
          ) : locations.length > 0 ? (
            locations.map((location, index) => {
              const showBorder = index + 1 !== locations.length;
              const borderClass = showBorder ? "border-b-2 border-b-gray-400" : "";
              return (
                <TouchableOpacity
                  key={index}
                  className={"flex-row items-center px-4 p-3 mb-1 " + borderClass}
                  onPress={() => handleLocationPress(location)}
                >
                  <MapPinIcon size={20} color={"red"} />
                  <Text className="text-black ml-2 text-lg">{location.name}</Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text className="text-black p-3 text-lg">No locations found</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default SearchBar;