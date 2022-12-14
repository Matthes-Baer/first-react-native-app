import { View, Text, Button } from "react-native";
import { useEffect, useState } from "react";

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

import { createUser, signInUser } from "../../utils/auth";

export default function SecondScreen({ navigation, route }: Props) {
  //! Hooks are used to access the corresponding methods outside of screen components - in this case such hooks are therefore not necessary.
  const navigationHook = useNavigation<SecondNestedScreenNavigationProp>();
  const routeHook = useRoute<SecondScreenRouteProp>();

  const [fetchError, setFetchError] = useState<{
    errorBol: boolean;
    message: string;
  }>({
    errorBol: false,
    message: "",
  });
  //? One could create different Navigators (one for authenticated users and one for non-authenticated users) depending on if a token is available or not.
  const [authToken, setAuthToken] = useState<string | undefined>();

  const createUserHandler = async () => {
    setFetchError({ errorBol: false, message: "" });
    try {
      const response = await createUser({
        email: "Test3@gmx.de",
        password: "1234567",
      });
      const result = await response;
      if (!result.idToken) {
        //? This could be added for other specific error cases (wrong password, ... etc.)
        if (result.error.errors[0].message == "EMAIL_EXISTS") {
          throw new Error("Email is already existing.");
        } else {
          throw new Error("Error not specified.");
        }
      } else {
        setAuthToken(result.idToken);
      }
    } catch (error) {
      setFetchError({ errorBol: true, message: `${error}` });
    }
  };

  const signInUserHandler = async () => {
    setFetchError({ errorBol: false, message: "" });
    try {
      const response = await signInUser({
        email: "Test2@gmx.de",
        password: "1234567",
      });
      const result = await response;
      if (!result.idToken) {
        throw new Error();
      } else {
        setAuthToken(result.idToken);
      }
    } catch (error) {
      setFetchError({ errorBol: true, message: `${error}` });
    }
  };

  return (
    <View>
      <Text>Log in page</Text>
      <Button title="create User" onPress={createUserHandler} />
      <Button title="sign in User" onPress={signInUserHandler} />
      <Text>{fetchError.errorBol && fetchError.message}</Text>
      <Text>token: {authToken ? authToken : "no token"} </Text>
      <Button title="Logout" onPress={() => setAuthToken(undefined)} />
    </View>
  );
}
