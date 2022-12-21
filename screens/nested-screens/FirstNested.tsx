import { View, Text, Button } from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";

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

import {
  addToDatabase,
  readAllDataFromDatabase,
  updateDataFromDatabase,
  deleteDataFromDatabase,
} from "../../utils/http";
import { FlatList } from "react-native-gesture-handler";

export default function SecondScreen({ navigation, route }: Props) {
  const [fetchData, setFetchData] = useState<
    Array<{ id: string; name: string }>
  >([]);

  const navigationHook = useNavigation<FirstNestedScreenNavigationProp>();
  const routeHook = useRoute<SecondScreenRouteProp>();

  async function fetchDBData() {
    setFetchData(await readAllDataFromDatabase());
  }

  useEffect(() => {
    fetchDBData();
  }, []);

  const handleDBActions = (action: string, id?: string) => {
    if (action == "UPDATE") {
      updateDataFromDatabase(id);
    } else if (action == "DELETE") {
      deleteDataFromDatabase(id);
    } else if (action == "ADD") {
      addToDatabase({ itemName: "TestName" });
    } else {
      return;
    }
    fetchDBData();
  };

  return (
    <View>
      <Text>Second Screen Text</Text>
      {/* //? The following segment is used to render the fetched data onto the screen. */}
      {fetchData && (
        <FlatList
          data={fetchData}
          renderItem={(itemdata) => (
            <View>
              <Text>
                {itemdata.item.name ? itemdata.item.name : "no name included"}
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
          keyExtractor={(item: { id: string; name: string }, index: number) => {
            return item.id;
          }}
        />
      )}

      <Button
        title="send Data to Database"
        onPress={() => handleDBActions("ADD")}
      />
    </View>
  );
}
