import { View, Text, Button } from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // This is used to access data the entire time even if the app was closed

import type { NestedStackParamList } from "../../utils/ReactNavigationTypes";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<NestedStackParamList, "FirstNested">;

//! The useNavigation hook can be used when having to access the navigation method in a component that is not a screen component.
//! The useRoute hook provides the same functions as having it as a prop for the screen component but can be used for non screen components. Helpful for receiving the route props, for example.
//? Therefore in this case it's irrelevant since this is a screen component.
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native"; //? useIsFocused is helpful when trying to make changes to a screen after it got created (for example when adding different params to the screen) - within a useEffect it will return true or false depending on if the screen is currently selected or not
import type { StackNavigationProp } from "@react-navigation/stack"; // for useNavigation hook
import type { RouteProp } from "@react-navigation/native"; // for useRoute hook

type FirstNestedScreenNavigationProp = StackNavigationProp<
  NestedStackParamList,
  "FirstNested"
>;

type SecondScreenRouteProp = RouteProp<NestedStackParamList, "FirstNested">;

import {
  addToDatabase,
  readAllDataFromDatabase,
  updateDataFromDatabase,
  deleteDataFromDatabase,
} from "../../utils/http";
import { FlatList } from "react-native-gesture-handler";
import Loading from "../../components/UI/Loading";

import { createUser, signInUser } from "../../utils/auth";

export default function SecondScreen({ navigation, route }: Props) {
  const [fetchData, setFetchData] =
    useState<Array<{ id: string; itemName: string }>>();

  const navigationHook = useNavigation<FirstNestedScreenNavigationProp>();
  const routeHook = useRoute<SecondScreenRouteProp>();

  //? Using the AsyncStorage to get the token that was received after logging in (if there is one).
  //! The token logic is lacking a refresh logic or automatically logging out since the token will be denied after 1 hour (in case of firebase -> SDK would be the proper approach)
  useEffect(() => {
    async function fetchToken() {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setAuthToken(token);
      }
    }
    fetchToken();
  }, []);

  //? Hier auch noch einmal LogIn-Funktion eingefügt, um es schnell ohne übergreifenden State testen zu können.
  //? In echt sollte man useContext oder Redux nutzen, um überall den gleichen Token-State zu haben.
  const [authToken, setAuthToken] = useState<string | undefined>();
  const signInUserHandler = async () => {
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
        AsyncStorage.setItem("token", result.idToken);
      }
    } catch (error) {}
  };

  const logoutHandler = async () => {
    setAuthToken(undefined);
    await AsyncStorage.removeItem("token");
  };

  async function fetchDBData() {
    try {
      setFetchData(await readAllDataFromDatabase(authToken));
    } catch (error) {
      //? This is where some additional logic should be added to render an error overlay for the user, for example.
      console.log(error);
    }
  }

  useEffect(() => {
    // setTimeout(fetchDBData, 2000); -> used for making the Loading screen more visible while working on it.
    fetchDBData();
  }, []);

  const handleDBActions = async (action: string, id?: string) => {
    if (action == "UPDATE") {
      await updateDataFromDatabase(id, authToken);
    } else if (action == "DELETE") {
      await deleteDataFromDatabase(id, authToken);
    } else if (action == "ADD") {
      await addToDatabase({ itemName: "TestName" }, authToken);
    } else {
      return;
    }
    fetchDBData();
  };

  return (
    <View>
      <Button title="Login" onPress={signInUserHandler} />
      <Button title="Logout" onPress={logoutHandler} />
      <Text>Second Screen Text</Text>
      {/* //? The following segment is used to render the fetched data onto the screen. */}
      {fetchData ? (
        <FlatList
          data={fetchData}
          renderItem={(itemdata) => (
            <View>
              <Text>
                {itemdata.item.itemName
                  ? itemdata.item.itemName
                  : "no name included"}
              </Text>
              <Button
                title="update this"
                onPress={() => handleDBActions("UPDATE", itemdata.item.id)}
              />
              <Button
                title="delete this"
                onPress={() => handleDBActions("DELETE", itemdata.item.id)}
              />
            </View>
          )}
          keyExtractor={(
            item: { id: string; itemName: string },
            index: number
          ) => {
            return item.id;
          }}
        />
      ) : (
        <Loading />
      )}

      <Button
        title="send Data to Database"
        onPress={() => handleDBActions("ADD")}
      />
    </View>
  );
}
