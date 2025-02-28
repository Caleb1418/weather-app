import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Animated,
} from "react-native";
import { MagnifyingGlassIcon, XMarkIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { theme } from "~/theme";
import axios from "axios";
import { SearchBarProps } from "~/types/module";
import { API_KEY } from "@env";

const SearchBar: React.FC<SearchBarProps> = ({
  showSearch,
  setShowSearch,
  onLocationSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState<
    { name: string; country: string; lat: number; lon: number }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [animation] = useState(new Animated.Value(0)); 

  // Smooth transition when search bar expands
  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: showSearch ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showSearch]);

  const searchBarWidth = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["15%", "100%"],
  });

  // Fetch locations based on search query
  const fetchLocations = async (query: string) => {
    if (!query) {
      setLocations([]);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
      );
      setLocations(
        response.data.map((loc: any) => ({
          name: loc.name,
          country: loc.country,
          lat: loc.lat,
          lon: loc.lon,
        }))
      );
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle location selection
  const handleLocationPress = (location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  }) => {
    onLocationSelect(location);
    setShowSearch(false);
    setSearchQuery("");
    setLocations([]);
  };

  // Clear search query
  const clearSearch = () => {
    setSearchQuery("");
    setLocations([]);
  };

  return (
    <View className="mx-4 relative z-50">
      <Animated.View
        className="flex-row items-center justify-end rounded-full overflow-hidden"
        style={{
          width: searchBarWidth,
          backgroundColor: showSearch ? theme.bgWhite(0.3) : "transparent",
        }}
      >
        {showSearch && (
          <TextInput
            placeholder="Find a city"
            placeholderTextColor={"lightgray"}
            className="pl-6 h-12 text-white flex-1 text-base"
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              fetchLocations(text);
            }}
          />
        )}

        <TouchableOpacity
          className="rounded-full p-3 m-1"
          style={{ backgroundColor: theme.bgWhite(0.2) }}
          onPress={() => {
            setShowSearch(!showSearch);
            if (showSearch) {
              clearSearch();
            }
          }}
        >
          {showSearch ? (
            <XMarkIcon size={28} color={"white"} />
          ) : (
            <MagnifyingGlassIcon size={28} color={"white"} />
          )}
        </TouchableOpacity>
      </Animated.View>

      {showSearch && (
        <View className="absolute w-full bg-gray-300 top-16 rounded-3xl shadow-lg">
          {loading ? (
            <ActivityIndicator size="small" color="black" className="p-3" />
          ) : locations.length > 0 ? (
            locations.map((location, index) => {
              const showBorder = index + 1 !== locations.length;
              return (
                <TouchableOpacity
                  key={index}
                  className={`flex-row items-center px-4 py-3 ${
                    showBorder ? "border-b-2 border-b-gray-400" : ""
                  }`}
                  onPress={() => handleLocationPress(location)}
                >
                  <MapPinIcon size={20} color={"red"} />
                  <Text className="text-black ml-2 text-lg">
                    {location.name}, {location.country}
                  </Text>
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