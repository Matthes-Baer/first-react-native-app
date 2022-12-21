export type StackParamList<T> = {
  //? The keys are the screen names
  //? The values can include the params which are able to passed to that screen via initialParams or via the navigate method
  Home: undefined;
  SecondScreen: { testParam: T } | undefined;
  //? The following is the screen that implements the nested structure.
  NestedNavigationScreen: undefined;
};

//? This type is used for the nested navigation structure
export type NestedStackParamList = {
  FirstNested: undefined;
  SecondNested: undefined;
  LogIn: undefined;
};
