import { View, Text, Button } from "react-native";

//? TypeScript stuff for React Navigation
import type { NestedStackParamList } from "../../utils/ReactNavigationTypes";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<NestedStackParamList, "LogIn">;

//! The useNavigation hook can be used when having to access the navigation method in a component that is not a screen component.
//! The useRoute hook provides the same functions as having it as a prop for the screen component but can be used for non screen components. Helpful for receiving the route props, for example.
//? Therefore in this case it's irrelevant since this is a screen component.
import { useNavigation, useRoute } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack"; // for useNavigation hook
import type { RouteProp } from "@react-navigation/native"; // for useRoute hook

type SecondNestedScreenNavigationProp = StackNavigationProp<
  NestedStackParamList,
  "LogIn"
>;

type SecondScreenRouteProp = RouteProp<NestedStackParamList, "LogIn">;

import { createUser } from "../../utils/auth";

export default function SecondScreen({ navigation, route }: Props) {
  //! Hooks are used to access the corresponding methods outside of screen components - in this case such hooks are therefore not necessary.
  const navigationHook = useNavigation<SecondNestedScreenNavigationProp>();
  const routeHook = useRoute<SecondScreenRouteProp>();

  const createUserHandler = async () => {
    await createUser({ email: "Test@gmx.de", password: "123" });
  };

  return (
    <View>
      <Text>Log in page</Text>
      <Button title="create User" onPress={createUserHandler} />
    </View>
  );
}
