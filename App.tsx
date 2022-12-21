import { StatusBar } from "expo-status-bar";
import { Text, View, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native"; // This component is used to wrap the whole application
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Home from "./screens/Home";
import SecondScreen from "./screens/SecondScreen";
import FirstNested from "./screens/nested-screens/FirstNested";
import SecondNested from "./screens/nested-screens/SecondNested";
import LogIn from "./screens/nested-screens/LogIn";

import type { StackParamList } from "./utils/ReactNavigationTypes";
import type { NestedStackParamList } from "./utils/ReactNavigationTypes";

import Ionicons from "@expo/vector-icons/Ionicons";
//? This is basically a singular import from the expo icons
import { AntDesign } from "@expo/vector-icons";

const TopTabs = createMaterialTopTabNavigator<NestedStackParamList>();
const Stack = createNativeStackNavigator<StackParamList<string>>();

//? This is a React Component for the nested navigation structure - it includes the screens which should be nested; itself it gets used as component for a screen of the parent navigation system
const TopTabsComponent = () => {
  return (
    <TopTabs.Navigator>
      <TopTabs.Screen
        name="FirstNested"
        component={FirstNested}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="switcher" size={24} color={color} />
          ),
        }}
      />
      <TopTabs.Screen
        name="SecondNested"
        component={SecondNested}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name="time" size={24} color={color} />
          ),
        }}
      />
      <TopTabs.Screen
        name="LogIn"
        component={LogIn}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name="airplane" size={24} color={color} />
          ),
        }}
      />
    </TopTabs.Navigator>
  );
};

//? In this case I'm using stack/native stack for navigation. There are also drawers and tabs which serve navigation purposes -> https://reactnavigation.org/docs/drawer-navigator
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          // Default options for all screens/routes
          screenOptions={({ navigation }) => ({
            headerStyle: { backgroundColor: "#6B8E23" },
            contentStyle: { backgroundColor: "#778899" },
            headerTintColor: "brown",
            headerRight: ({ tintColor }) => (
              <View>
                <Text style={{ color: tintColor }}>Test</Text>
                <Button
                  color={tintColor}
                  onPress={() => navigation.navigate("NestedNavigationScreen")}
                  title="To Nested"
                />
              </View>
            ),
          })}
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
          <Stack.Screen
            name="NestedNavigationScreen"
            component={TopTabsComponent}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
