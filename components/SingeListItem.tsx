import { StyleSheet, Text, Pressable, View } from "react-native";

const SingleListItem = (props: {
  listItemData: string;
  listItemIdx: number;
  deleteCurrentElement: Function;
}) => {
  return (
    <Pressable
      // This bind expression is needed to insert an argument to the function from a parent component.
      onPress={props.deleteCurrentElement.bind(this, props.listItemIdx)}
    >
      <View>
        <Text style={styles.text}>{props.listItemData}</Text>
      </View>
    </Pressable>
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
  },
});
