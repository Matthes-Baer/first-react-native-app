import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native"; // This component is used to wrap the whole application
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import SecondScreen from "./screens/SecondScreen";
import type { StackParamList } from "./utils/ReactNavigationTypes";

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {/* These are considered screen components */}
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="SecondScreen"
            component={SecondScreen}
            initialParams={{ testParam: "initialParam" }}
            options={{
              headerLeft: () => <Text>Header Left</Text>,
              title: "This is the Second Screen Route",
              headerStyle: { backgroundColor: "#6B8E23" },
              contentStyle: { backgroundColor: "#778899" },
              headerTintColor: "white",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
