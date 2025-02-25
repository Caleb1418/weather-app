import { Image, Text, View } from "react-native";
import { SunIcon } from "react-native-heroicons/outline";

const CurrentWeather: React.FC = () => {
  return (
    <View className="mx-4 flex justify-around flex-1 mb-1">
      <Text className="text-white text-center text-2xl font-bold">
        CurrentWeather,
        <Text className="text-lg font-semibold text-gray-300">
          CurrentWeather
        </Text>
      </Text>
      <View className="flex-row justify-center">
        <Image
          source={require("../../assets/images/PartlyCloudy.png")}
          className="w-40 h-40"
        />
      </View>
      <View className="space-y-2">
        <Text className="text-center font-bold text-white text-6xl ml-5">
          30°C
        </Text>
        <Text className="text-center font-bold text-white text-xl tracking-widest">
          Partly cloudy
        </Text>
      </View>
      <View className="flex-row justify-between mx-4">
        <View className="flex-row space-x-2 items-center">
          <Image
            source={require("../../assets/images/wind.png")}
            className="w-10 h-10"
          />
          <Text className="text-white font-semibold text-base">22km</Text>
        </View>
        <View className="flex-row space-x-2 items-center ">
          <Image
            source={require("../../assets/images/Humidity.png")}
            className="w-7  h-7 pr-2"
            tintColor={"white"}
          />
          <Text className="text-white font-semibold text-base pl-2">22%</Text>
        </View>
        <View className="flex-row space-x-2 items-center">
          <SunIcon size={30} color={"white"} />
          <Text className="text-white font-semibold text-base pl-1">
            22:20 AM
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CurrentWeather;
