import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native"; // This component is used to wrap the whole application
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import SecondScreen from "./screens/SecondScreen";
import type { StackParamList } from "./utils/ReactNavigationTypes";

const Stack = createNativeStackNavigator<StackParamList<string>>();

//? In this case I'm using stack/native stack for navigation. There are also drawers and tabs which serve navigation purposes -> https://reactnavigation.org/docs/drawer-navigator
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          // Default options for all screens/routes
          screenOptions={{
            headerStyle: { backgroundColor: "#6B8E23" },
            contentStyle: { backgroundColor: "#778899" },
            headerTintColor: "white",
          }}
        >
          {/* These are considered screen components */}
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="SecondScreen"
            component={SecondScreen}
            initialParams={{ testParam: "initialParam" }}
            options={{
              headerLeft: () => <Text>Header Left</Text>,
              //? The title was also adjusted dynamically in the route (which has priority over this option)
              title: "This is the Second Screen Route",
              headerTintColor: "red",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
