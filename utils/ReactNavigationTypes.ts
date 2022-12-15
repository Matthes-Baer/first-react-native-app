import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type StackParamList<T> = {
  //? The keys are the screen names
  //? The values can include the params which are able to passed to that screen via initialParams or via the navigate method
  Home: undefined;
  SecondScreen: { testParam: T } | undefined;
};
