import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, Image } from "react-native";
import { fetchHourlyWeather } from "~/api/WeatherApi"; 

interface HourlyWeatherProps {
  latitude: number;
  longitude: number;
}

interface HourlyWeatherData {
  dt: number; // Timestamp
  main: {
    temp: number; // Temperature
  };
  weather: {
    icon: string; // Weather icon code
    description: string; // Weather description
  }[];
}

const HourlyWeather: React.FC<HourlyWeatherProps> = ({ latitude, longitude }) => {
  const [hourlyData, setHourlyData] = useState<HourlyWeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch 3-hour forecast data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHourlyWeather(latitude, longitude);
        setHourlyData(data);
      } catch (err) {
        console.error("Error fetching hourly weather data:", err);
        setError("Failed to fetch hourly weather data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [latitude, longitude]);

  // Convert timestamp to time (e.g., "14:00")
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (loading) {
    return (
      <View className="items-center justify-center p-4">
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="items-center justify-center p-4">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <View className="my-4">
      <Text className="text-white text-lg font-bold mb-2">3-Hour Forecast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {hourlyData.map((hour, index) => (
          <View
            key={index}
            className="items-center justify-center bg-white/20 rounded-lg p-3 mx-2"
          >
            <Text className="text-white text-sm">{formatTime(hour.dt)}</Text>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`,
              }}
              className="w-12 h-12"
            />
            <Text className="text-white text-sm">{Math.round(hour.main.temp)}°C</Text>
            <Text className="text-white text-xs text-center">
              {hour.weather[0].description}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HourlyWeather;