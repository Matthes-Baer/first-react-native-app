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
} from "react-native";

const ModalComponent = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
            style={styles.image}
            source={require("../assets/images/example-image.png")}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 250,
    marginTop: 35,
  },
});
