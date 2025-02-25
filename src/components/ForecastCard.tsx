import React from "react";
import { Image, Text, View } from "react-native";
import { theme } from "~/theme";

const ForecastCard: React.FC = () => {
  return (
    <>
      <View
        className="flex justify-center items-center w-28 rounded-3xl py-3 space-y-1 mr-4"
        style={{ backgroundColor: theme.bgWhite(0.17) }}
      >
        <Image
          source={require("../../assets/images/HeavyRain.png")}
          className="w-14 h-14"
        />
        <Text className="text-white">Monday</Text>
        <Text className="text-white">30°C</Text>
      </View>
      <View
        className="flex justify-center items-center w-28 rounded-3xl py-3 space-y-1 mr-4"
        style={{ backgroundColor: theme.bgWhite(0.17) }}
      >
        <Image
          source={require("../../assets/images/HeavyRain.png")}
          className="w-14 h-14"
        />
        <Text className="text-white">Monday</Text>
        <Text className="text-white">30°C</Text>
      </View>
      <View
        className="flex justify-center items-center w-28 rounded-3xl py-3 space-y-1 mr-4"
        style={{ backgroundColor: theme.bgWhite(0.17) }}
      >
        <Image
          source={require("../../assets/images/HeavyRain.png")}
          className="w-14 h-14"
        />
        <Text className="text-white">Monday</Text>
        <Text className="text-white">30°C</Text>
      </View>
      <View
        className="flex justify-center items-center w-28 rounded-3xl py-3 space-y-1 mr-4"
        style={{ backgroundColor: theme.bgWhite(0.17) }}
      >
        <Image
          source={require("../../assets/images/HeavyRain.png")}
          className="w-14 h-14"
        />
        <Text className="text-white">Monday</Text>
        <Text className="text-white">30°C</Text>
      </View>
      <View
        className="flex justify-center items-center w-28 rounded-3xl py-3 space-y-1 mr-4"
        style={{ backgroundColor: theme.bgWhite(0.17) }}
      >
        <Image
          source={require("../../assets/images/HeavyRain.png")}
          className="w-14 h-14"
        />
        <Text className="text-white">Monday</Text>
        <Text className="text-white">30°C</Text>
      </View>
      <View
        className="flex justify-center items-center w-28 rounded-3xl py-3 space-y-1 mr-4"
        style={{ backgroundColor: theme.bgWhite(0.17) }}
      >
        <Image
          source={require("../../assets/images/HeavyRain.png")}
          className="w-14 h-14"
        />
        <Text className="text-white">Monday</Text>
        <Text className="text-white">30°C</Text>
      </View>
    </>
  );
};
export default ForecastCard;
