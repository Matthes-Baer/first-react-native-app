import { View, Text, Button, Alert, Platform } from "react-native";
import { useState, useEffect } from "react";

//? TypeScript stuff for React Navigation
import type { NestedStackParamList } from "../../utils/ReactNavigationTypes";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<NestedStackParamList, "SecondNested">;

//! The useNavigation hook can be used when having to access the navigation method in a component that is not a screen component.
//! The useRoute hook provides the same functions as having it as a prop for the screen component but can be used for non screen components. Helpful for receiving the route props, for example.
//? Therefore in this case it's irrelevant since this is a screen component.
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack"; // for useNavigation hook
import type { RouteProp } from "@react-navigation/native"; // for useRoute hook
import ImagePicker from "../../components/ImagePicker";
import LocationPicker from "../../components/LocationPicker";

//? SQLite database functions
import { init, insertData, fetchData } from "../../utils/database";

//? Stuff für Expo Notifications:
//? 251. Video für Infos zu Local & Push Notifications
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

type SecondNestedScreenNavigationProp = StackNavigationProp<
  NestedStackParamList,
  "SecondNested"
>;

type SecondScreenRouteProp = RouteProp<NestedStackParamList, "SecondNested">;

export default function SecondScreen({ navigation, route }: Props) {
  //! Hooks are used to access the corresponding methods outside of screen components - in this case such hooks are therefore not necessary.
  const navigationHook = useNavigation<SecondNestedScreenNavigationProp>();
  const routeHook = useRoute<SecondScreenRouteProp>();
  const isFocused = useIsFocused();

  const [dbInitialized, setDbInitialized] = useState(false);
  const [databaseData, setDatabaseData] = useState<any>();

  //? Hiermit wird der Push-Token (Expo Notifications) eingeholt - jedes Gerät hat seinen eigenen individuellen Push-Token
  useEffect(() => {
    //? Diese Funktion holt zunächst die nötigen Permissions ein.
    //? Das Ganze kann getestet werden mittels https://expo.dev/notifications
    //? Damit das mit den Push Notifcations klappt, muss das Projekt mit den Expo-Servern verbunden sein (im Account das Projekt hinzufügen) - das ist auch fürs Testen notwendig.
    const configurePushNotifications = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;
      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "Permission required",
          "Push notifcations need permissions."
        );
        return;
      }
      const pushToken = await Notifications.getExpoPushTokenAsync();
      console.log(pushToken);

      //? Das hier ist spezifisch für Android und stellt unter anderem die Wichtigkeit der Notification ein.
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    };
    configurePushNotifications();
  }, []);

  //? This function needs the device's push notification token which normally would be fetched and then added in the backend, for example.
  //? For this frontend example one can hardcode it to test how it works to send a push notifcation programmatically, but this isn't an appropriate real-world approach.
  // const sendPushNotifcationProgrammatically = async () => {
  //   const response = await fetch("https://exp.host/--/api/v2/push/send", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       to: "",
  //       title: "Test - send from a device",
  //       body: "This is the body",
  //     }),
  //   });
  // };

  useEffect(() => {
    if (isFocused) {
      init()
        .then(() => setDbInitialized(true))
        .catch((err) => {
          console.log(err);
        });
    }

    //? Wird ausgeführt, wenn eine Notification erscheint.
    const subscriptionReceive = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );

    //? Wird ausgeführt, wenn der Nutzer auf die Notification-Meldung drückt.
    const subscriptionPush =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    //? Return in useEffect kann genutzt werden, um event listeners zu entfernen.
    return () => {
      subscriptionReceive.remove();
      subscriptionPush.remove();
    };
  }, []);

  const fetchDatabaseData = async () => {
    const result = await fetchData();
    setDatabaseData(result);
  };

  const scheduleNotifcationsHandler = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "My first local notification",
        body: "This is the body of the notification.",
        //? data kann mit dem event listener aus der Notification herausgelesen werden.
        data: { userName: "KAY" },
      },
      trigger: {
        seconds: 2,
      },
    });
  };

  return (
    <View>
      <Text>Second Screen Text</Text>
      <ImagePicker />
      <LocationPicker />
      <Button
        title="insert data into databse with SQLite"
        onPress={() =>
          insertData({
            title: "titleEntry",
            description: "This is a description entry",
          })
        }
      />
      <Button title="fetch database Data" onPress={fetchDatabaseData} />
      <View>
        {databaseData &&
          databaseData.map(
            (e: { id: number; title: string; description: string }) => {
              return (
                <Text key={e.id}>
                  {e.title}: {e.description}
                </Text>
              );
            }
          )}
      </View>
      <Button
        title="schedule local notification"
        onPress={scheduleNotifcationsHandler}
      />
      {/* <Button
        title="invoke push notification - token not available"
        onPress={sendPushNotifcationProgrammatically}
      /> */}
    </View>
  );
}
