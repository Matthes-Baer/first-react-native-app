import { View, Text, Button } from "react-native";
import { useState, useEffect } from "react";

//? TypeScript stuff for React Navigation
import type { NestedStackParamList } from "../../utils/ReactNavigationTypes";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<NestedStackParamList, "SecondNested">;

//! The useNavigation hook can be used when having to access the navigation method in a component that is not a screen component.
//! The useRoute hook provides the same functions as having it as a prop for the screen component but can be used for non screen components. Helpful for receiving the route props, for example.
//? Therefore in this case it's irrelevant since this is a screen component.
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack"; // for useNavigation hook
import type { RouteProp } from "@react-navigation/native"; // for useRoute hook
import ImagePicker from "../../components/ImagePicker";
import LocationPicker from "../../components/LocationPicker";

//? SQLite database functions
import { init, insertData, fetchData } from "../../utils/database";

type SecondNestedScreenNavigationProp = StackNavigationProp<
  NestedStackParamList,
  "SecondNested"
>;

type SecondScreenRouteProp = RouteProp<NestedStackParamList, "SecondNested">;

export default function SecondScreen({ navigation, route }: Props) {
  //! Hooks are used to access the corresponding methods outside of screen components - in this case such hooks are therefore not necessary.
  const navigationHook = useNavigation<SecondNestedScreenNavigationProp>();
  const routeHook = useRoute<SecondScreenRouteProp>();
  const isFocused = useIsFocused();

  const [dbInitialized, setDbInitialized] = useState(false);
  const [databaseData, setDatabaseData] = useState<any>();

  useEffect(() => {
    if (isFocused) {
      init()
        .then(() => setDbInitialized(true))
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const fetchDatabaseData = async () => {
    const result = await fetchData();
    setDatabaseData(result);
  };

  return (
    <View>
      <Text>Second Screen Text</Text>
      <ImagePicker />
      <LocationPicker />
      <Button
        title="insert data into databse with SQLite"
        onPress={() =>
          insertData({
            title: "titleEntry",
            description: "This is a description entry",
          })
        }
      />
      <Button title="fetch database Data" onPress={fetchDatabaseData} />
      <View>
        {databaseData &&
          databaseData.map(
            (e: { id: number; title: string; description: string }) => {
              return (
                <Text key={e.id}>
                  {e.title}: {e.description}
                </Text>
              );
            }
          )}
      </View>
    </View>
  );
}
