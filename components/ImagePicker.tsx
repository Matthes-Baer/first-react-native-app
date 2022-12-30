import { Text, View, Button, Image, Alert, StyleSheet } from "react-native";
import {
  ImagePickerResult,
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";

const ImagePicker = () => {
  const [cameraPerimissionInformation, requestPermission] =
    useCameraPermissions();
  const [image, setImage] = useState<ImagePickerResult>();

  //? This verify process is necessary to make it work on iOS - but also recommended for android systems
  const verifyPermission = async () => {
    if (cameraPerimissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPerimissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert("Insufficient Permissions for camera.");
      return false;
    }

    return true;
  };

  const takeImage = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const takenImage = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setImage(takenImage);
  };

  return (
    <View>
      <Text>Image Picker</Text>
      <View>
        <Button title="Take image" onPress={() => takeImage()} />
      </View>
      <View>
        {image ? (
          <Image
            source={{ uri: image.assets[0].uri }}
            style={styles.imagePreview}
          />
        ) : (
          <Text style={styles.imagePreview}>No image taken yet.</Text>
        )}
      </View>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});
