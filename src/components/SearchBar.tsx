import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import {MapPinIcon} from "react-native-heroicons/solid"
import { theme } from "~/theme";

interface SearchBarProps {
  showsearch: boolean;
  setShowSearch: (show: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ showsearch, setShowSearch }) => {
  const [locations, setLocations] = useState([1, 2, 3]);
  const handleLocationPress = () => {
    console.log("Location pressed");
  }
  return (
    <View className="mx-4 relative z-50 h-[10%]">
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
      {locations.length > 0 && showsearch ? (
        <View className="absolute w-full bg-gray-300 top-16 z-50 rounded-3xl">
          {locations.map((location, index) => {
            let showBorder = index+1  != locations.length;
            let borderClass = showBorder ? "border-b-2 border-b-gray-400" : "";
            return (
              <TouchableOpacity key={index} className={"flex-row items-center px-4 p-3 mb-1 " + borderClass} onPress={() => handleLocationPress()}>
                <MapPinIcon size={20} color={"red"} />
                <Text className="text-black ml-2 text-lg"> test</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
    </View>
  );
};

export default SearchBar;
