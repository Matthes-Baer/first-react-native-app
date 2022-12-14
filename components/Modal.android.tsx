import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  Modal,
  Image,
  Alert,
  Dimensions,
  useWindowDimensions,
} from "react-native";

const ModalComponent = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const windowDimensions = useWindowDimensions();
  const orientationWidthHeighBorderRadius = {
    width: windowDimensions.width < 380 ? 150 : 300,
    height: windowDimensions.height < 380 ? 150 : 300,
    borderRadius: windowDimensions.width < 380 ? 125 : 250,
  };

  const orientationModalValues = {
    width: windowDimensions.width < 380 ? "75%" : "50%",
    height: windowDimensions.height < 380 ? "90%" : "70%",
  };

  const openModal = () => {
    Alert.alert(
      "Modal opened",
      "You have opened a modal.",
      [
        {
          text: "Close",
          onPress: () =>
            console.log(
              "This function was executed when the modal was opened and the Alert was dismissed by 'Close'."
            ),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () =>
            console.log(
              "This function was executed when the modal was opened and the Alert was dismissed by 'OK'."
            ),
          style: "destructive",
        },
      ],
      {
        cancelable: true,
        onDismiss() {
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          );
        },
      }
    );
    setModalOpen((prev) => !prev);
  };

  return (
    <View>
      <Button onPress={openModal} title="Open Modal" />
      <Modal
        //! In theory, conditionally rendering with the useState hook as done in web dev applications would also work.
        //! However, embracing the in-built Modal component can provide a smoother user experience.
        visible={modalOpen}
        animationType="slide"
      >
        <View>
          <ScrollView>
            <Text
              style={{
                textAlign: "center",
                fontSize: 35,
                marginVertical: 35,
                fontFamily: "Press-Start",
              }}
            >
              The Modal was opened!
            </Text>
            <Button
              // style is not accessible for Button, only color.
              onPress={() => setModalOpen((prev) => !prev)}
              title="Close Modal"
              color={"red"}
            />
            <Image
              style={[styles.image, orientationWidthHeighBorderRadius]}
              source={require("../assets/images/example-image.png")}
            />
            <Image
              style={[styles.image, orientationWidthHeighBorderRadius]}
              source={{
                uri: "https://i.postimg.cc/PxzKLj3N/Edgerunner-Example-4.png",
              }}
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default ModalComponent;

// const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  image: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 35,
  },
  modalContainer: {},
});
