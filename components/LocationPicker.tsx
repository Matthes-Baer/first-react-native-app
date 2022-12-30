import { View, Button, Alert } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

//? While for the Image Picker is was only necessary to check for permissions for iOS (not for android), the location picker requires to ask for permissions for both android and iOS.
const LocationPicker = () => {
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
      console.log(location);
    }
  };

  const pickOnMapHandler = () => {};

  return (
    <View>
      <View>
        <Button title="get location" onPress={() => getLocationHandler()} />
        <Button title="pick location on map" onPress={pickOnMapHandler} />
      </View>
    </View>
  );
};

export default LocationPicker;
