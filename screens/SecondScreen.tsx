import { View, Text, Button } from "react-native";

import type { StackParamList } from "../utils/ReactNavigationTypes";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<StackParamList, "SecondScreen">;

export default function SecondScreen({ navigation }: Props) {
  return (
    <View>
      <Text>Second Screen Text</Text>
      <Button
        title="Go to Home Screen"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}
