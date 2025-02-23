import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                id={undefined}  
                initialRouteName="Home" 
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen name="Details" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}