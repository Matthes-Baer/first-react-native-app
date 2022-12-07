import SingleListItem from "./SingeListItem";
import { Text, View, FlatList } from "react-native";

const DataList = (props: { flatListData: Array<string> }) => {
  return (
    <View style={{ height: 500 }}>
      <FlatList
        data={props.flatListData}
        renderItem={(itemData) => {
          return (
            <View>
              <SingleListItem listItemData={itemData.item} />
            </View>
          );
        }}
        keyExtractor={(item, index) => {
          // should just be implemented in the state (item) which would be structured as an object with "key" - then this function would not be needed.
          // Or use "id", for example and return that in this function.
          const keyValue = `${Math.random().toString()}&${index}`;
          return keyValue;
        }}
      />
    </View>
  );
};

export default DataList;
