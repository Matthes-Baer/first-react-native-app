import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react";

import type { NestedStackParamList } from "../utils/ReactNavigationTypes";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<NestedStackParamList, "Map">;

const Map = ({ navigation, route }: Props) => {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  }>();

  const region = {
    latitude: 37,
    longitude: -122,
    latitudeDelta: 0,
    longitudeDelta: 0,
  };

  const selectLocationHandler = (event) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat, lng });
  };

  return (
    <View>
      <View>
        <MapView
          style={styles.map}
          initialRegion={region}
          onPress={selectLocationHandler}
        >
          {selectedLocation && (
            <Marker
              title="Picked Location"
              coordinate={{
                latitude: selectedLocation.lat,
                longitude: selectedLocation.lng,
              }}
            />
          )}
        </MapView>
      </View>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
