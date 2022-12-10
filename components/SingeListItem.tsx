import { StyleSheet, Text, Pressable, View } from "react-native";

const SingleListItem = (props: {
  listItemData: string;
  listItemIdx: number;
  deleteCurrentElement: Function;
}) => {
  return (
    <View>
      <Pressable
        // This bind expression is needed to insert an argument to the function from a parent component.
        onPress={props.deleteCurrentElement.bind(this, props.listItemIdx)}
        // android-ripple only affects android devices.
        android_ripple={{ color: "red" }}
        // this styling function affects BOTH android and iOS devices
        style={(pressedData) =>
          pressedData.pressed && [styles.iOSPressedEffect]
        }
      >
        <Text style={styles.text}>{props.listItemData}</Text>
      </Pressable>
    </View>
  );
};

export default SingleListItem;

const styles = StyleSheet.create({
  text: {
    backgroundColor: "#252525",
    fontSize: 30,
    color: "white",
    borderWidth: 1,
    borderColor: "red",
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  iOSPressedEffect: {
    backgroundColor: "red",
  },
});
