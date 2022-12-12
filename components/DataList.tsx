import SingleListItem from "./SingeListItem";
import { Text, View, FlatList } from "react-native";

const DataList = (props: {
  flatListData: Array<string>;
  deleteCurrentElement: Function;
}) => {
  return (
    <View style={{ height: 500 }}>
      <FlatList
        data={props.flatListData}
        renderItem={(itemData) => {
          return (
            <View>
              <SingleListItem
                listItemData={itemData.item}
                listItemIdx={itemData.index}
                deleteCurrentElement={props.deleteCurrentElement}
              />
            </View>
          );
        }}
        keyExtractor={(item, index) => {
          // should only be implemented in the state (item) which would be structured as an object with "key" - then this function would not be needed.
          // Or use "id", for example, and return that in this function.
          const keyValue = `${Math.random().toString()}&${index}`;
          return keyValue;
        }}
      />
    </View>
  );
};

export default DataList;
