import React, { useState } from "react";
import { Image, SafeAreaView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { theme } from "~/theme";
import SearchBar from "../components/SearchBar";

const HomeScreen: React.FC = () => {
  const [showsearch, setShowSearch] = useState<boolean>(false);

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        blurRadius={10}
        source={require("../../assets/images/background.png")}
        className="absolute h-full w-full"
      />
      <SafeAreaView className="flex-1 flex pt-24">
        <SearchBar showsearch={showsearch} setShowSearch={setShowSearch} />
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;