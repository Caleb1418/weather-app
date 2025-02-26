import React from "react";
import { Image, Text, View, ActivityIndicator, FlatList } from "react-native";
import { observer } from "mobx-react-lite";
import { weatherStore } from "~/stores/WeatherStore";

const ForecastCard: React.FC = observer(() => {
  const { forecastData, loading, error } = weatherStore;

  // Loading state
  if (loading) return <ActivityIndicator size="large" color="white" />;

  // Error state
  if (error) return <Text className="text-white">Error: {error}</Text>;

  // Check if data is defined and has the expected structure
  if (!forecastData || !forecastData.list) {
    return <Text className="text-white">No forecast data available</Text>;
  }

  // Filter data to show one forecast per day
  const dailyForecasts = forecastData.list.filter((item: any, index: number) => index % 8 === 0);

  return (
    <FlatList
      horizontal
      data={dailyForecasts}
      keyExtractor={(item) => item.dt.toString()}
      renderItem={({ item }) => (
        <View
          className="flex justify-center items-center w-28 rounded-3xl py-3 space-y-1 mr-4"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.17)" }}
        >
          <Image
            source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon.replace("n", "d")}@2x.png` }}
            className="w-14 h-14"
          />
          <Text className="text-white">{getDayOfWeek(item.dt_txt)}</Text>
          <Text className="text-white">{Math.round(item.main.temp)}°C</Text>
        </View>
      )}
    />
  );
});

// Helper function to get the day of the week
const getDayOfWeek = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

export default ForecastCard;