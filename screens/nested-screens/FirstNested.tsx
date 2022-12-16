import { View, Text, Button } from "react-native";
import { useLayoutEffect } from "react";

import type { NestedStackParamList } from "../../utils/ReactNavigationTypes";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<NestedStackParamList, "FirstNested">;

//! The useNavigation hook can be used when having to access the navigation method in a component that is not a screen component.
//! The useRoute hook provides the same functions as having it as a prop for the screen component but can be used for non screen components. Helpful for receiving the route props, for example.
//? Therefore in this case it's irrelevant since this is a screen component.
import { useNavigation, useRoute } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack"; // for useNavigation hook
import type { RouteProp } from "@react-navigation/native"; // for useRoute hook

type FirstNestedScreenNavigationProp = StackNavigationProp<
  NestedStackParamList,
  "FirstNested"
>;

type SecondScreenRouteProp = RouteProp<NestedStackParamList, "FirstNested">;

export default function SecondScreen({ navigation, route }: Props) {
  const navigationHook = useNavigation<FirstNestedScreenNavigationProp>();
  const routeHook = useRoute<SecondScreenRouteProp>();

  return (
    <View>
      <Text>Second Screen Text</Text>
    </View>
  );
}
