import { View, Button, Alert, Text } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useState } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack"; // for useNavigation hook
import type { NestedStackParamList } from "../utils/ReactNavigationTypes";

type MapNavigationProp = StackNavigationProp<NestedStackParamList, "Map">;

//? While for the Image Picker is was only necessary to check for permissions for iOS (not for android), the location picker requires to ask for permissions for both android and iOS.
//? Für die Preview wurde im Udemy-Kurs die Google Maps API verwendet (habe ich hier nicht übernommen) - 202. Video
const LocationPicker = () => {
  const navigationHook = useNavigation<MapNavigationProp>();
  const [location, setLocation] = useState<{ lat: number; long: number }>();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const verifyPermission = async () => {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert("Insufficient Permissions!");
      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission();

    if (hasPermission) {
      const location = await getCurrentPositionAsync();
      setLocation({
        lat: location.coords.latitude,
        long: location.coords.longitude,
      });
    }
  };

  const navigateToMap = () => {
    navigationHook.navigate("Map");
  };

  //   const pickOnMapHandler = () => {
  //? To use such a feature, MapView by expo can be used
  //   };

  return (
    <View>
      <View>
        <Button title="get location" onPress={() => getLocationHandler()} />
        {location && (
          <Text>
            lat: {location.lat} & long: {location.long}
          </Text>
        )}
        <Button title="get to Map" onPress={navigateToMap} />
      </View>
    </View>
  );
};

export default LocationPicker;
