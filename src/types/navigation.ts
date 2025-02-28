import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: { selectedLocation?: { lat: number; lon: number } };
  Location: undefined;
};

// Define the type for the navigation prop in each screen
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;
export type LocationScreenNavigationProp = StackNavigationProp<RootStackParamList, "Location">;