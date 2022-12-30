import { View, Text } from "react-native";

//? TypeScript stuff for React Navigation
import type { NestedStackParamList } from "../../utils/ReactNavigationTypes";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<NestedStackParamList, "SecondNested">;

//! The useNavigation hook can be used when having to access the navigation method in a component that is not a screen component.
//! The useRoute hook provides the same functions as having it as a prop for the screen component but can be used for non screen components. Helpful for receiving the route props, for example.
//? Therefore in this case it's irrelevant since this is a screen component.
import { useNavigation, useRoute } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack"; // for useNavigation hook
import type { RouteProp } from "@react-navigation/native"; // for useRoute hook
import ImagePicker from "../../components/ImagePicker";
import LocationPicker from "../../components/LocationPicker";

type SecondNestedScreenNavigationProp = StackNavigationProp<
  NestedStackParamList,
  "SecondNested"
>;

type SecondScreenRouteProp = RouteProp<NestedStackParamList, "SecondNested">;

export default function SecondScreen({ navigation, route }: Props) {
  //! Hooks are used to access the corresponding methods outside of screen components - in this case such hooks are therefore not necessary.
  const navigationHook = useNavigation<SecondNestedScreenNavigationProp>();
  const routeHook = useRoute<SecondScreenRouteProp>();

  return (
    <View>
      <Text>Second Screen Text</Text>
      <ImagePicker />
      <LocationPicker />
    </View>
  );
}
