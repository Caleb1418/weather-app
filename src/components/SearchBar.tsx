import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { theme } from "~/theme";

interface SearchBarProps {
  showsearch: boolean;
  setShowSearch: (show: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ showsearch, setShowSearch }) => {
  const [locations, setLocations] = useState([1, 2, 3]);

  return (
    <View className="mx-4 relative z-50">
    
      <View
        className="flex-row items-center justify-end rounded-full overflow-hidden"
        style={{
          backgroundColor: showsearch ? theme.bgWhite(0.3) : "transparent",
        }}
      >
        {showsearch ? (
          <TextInput
            placeholder="Find a city"
            placeholderTextColor={"lightgray"}
            className="pl-6 h-15 text-white flex-1 text-base"
          />
        ) : null}

        <TouchableOpacity
          style={{ backgroundColor: theme.bgWhite(0.2) }}
          className="rounded-full p-3 m-1"
          onPress={() => setShowSearch(!showsearch)}
        >
          <MagnifyingGlassIcon size={28} color={"white"} />
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      {locations.length > 0 && showsearch ? (
        <View className="w-full bg-gray-800 mt-2 rounded-3xl">
          {locations.map((location, index) => (
            <TouchableOpacity key={index} className="p-3 border-b border-gray-400">
              <Text className="text-black">Test</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
    </View>
  );
};

export default SearchBar;