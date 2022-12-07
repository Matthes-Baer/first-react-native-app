import { Text } from "react-native";

const SingleListItem = (props: { listItemData: string }) => {
  return <Text style={{ fontSize: 45 }}>{props.listItemData}</Text>;
};

export default SingleListItem;
