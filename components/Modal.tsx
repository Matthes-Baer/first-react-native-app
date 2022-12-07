import { useState } from "react";
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
} from "react-native";

const ModalComponent = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <View>
      <Button
        onPress={() => setModalOpen((prev) => !prev)}
        title="Open Modal"
      />
      <Modal
        // In theory, conditionally rendering with the useState hook as done in web dev applications would also work.
        // However, embracing the in-built Modal element can provide a smoother user experience.
        visible={modalOpen}
        animationType="slide"
      >
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 35,
              marginVertical: 35,
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
