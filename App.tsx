import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native"; // This component is used to wrap the whole application
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import SecondScreen from "./screens/SecondScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {/* These are considered screen components */}
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SecondScreen" component={SecondScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
