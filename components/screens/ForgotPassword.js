import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Modal,
  LogBox,
  KeyboardAvoidingView,
} from "react-native";
import { Icon, Overlay, Button, Input } from "react-native-elements";
import global from "./global";
function ForgotPassword({ navigation }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupError, setIsPopupError] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [email, setEmail] = useState("");
  const [webLink, setWebLink] = useState(
    "https://foodappcatarman.000webhostapp.com"
  );

  useEffect(() => {}, []);
  const sendEmail = async () => {
    // alert(estID);
    var getURL = `${webLink}/foodapp/backend/food.php`;
    var header = {
      Accept: "application/json",
    };

    if (email != "") {
      var formDta = new FormData();
      formDta.append("sendEmail", "submit");
      formDta.append("email", email);

      await fetch(getURL, {
        method: "POST",
        mode: "cors",
        body: formDta,
        headers: header,
      })
        .then((response) => response.json())
        .then((data) => {
          if (
            data.message ==
            "Unable to send email. Provided email address is not registered in our system."
          ) {
            setIsPopupError(true);
            setPopupMessage(data.message);
            setIsPopupVisible(true);
            hidePopUpMessage();
          } else {
            if (data.message == "Message has been sent.") {
              setIsPopupError(false);
              setPopupMessage(
                "Email Sent: We have sent your account details in your email. Kindly check your email."
              );
              setIsPopupVisible(true);
              hidePopUpMessage();
            } else {
              setIsPopupError(true);
              setPopupMessage(data.message);
              setIsPopupVisible(true);
              hidePopUpMessage();
            }
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    } else {
      setIsPopupError(true);
      setPopupMessage("Please enter email address");
      setIsPopupVisible(true);
      hidePopUpMessage();
    }
  };
  let hidePopUpMessage = () => {
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 2500);
  };
  return (
    <KeyboardAvoidingView style={styles.Main}>
      <ScrollView style={styles.ScreenMain}>
        <View style={styles.IMGContainer}>
          <View style={styles.IMGCenter}>
            <Image source={require("../images/forgot-password.png")} />
          </View>
          <Text style={styles.lblRecoverMain}>Recover account</Text>
          <Text style={styles.lblRecoverSub}>
            Enter your email address and we will send your account details.
          </Text>
          <Input
            containerStyle={{
              width: "80%",
              marginTop: 50,
              alignSelf: "center",
              marginBottom: 20,
            }}
            value={email}
            placeholder="Enter email address"
            secureTextEntry={false}
            onChangeText={(val) => setEmail(val)}
            inputStyle={{ textAlign: "center", fontWeight: "bold" }}
          />
          <Button
            title="Recover my account"
            onPress={sendEmail}
            iconContainerStyle={{ marginRight: 0, fontSize: 10 }}
            titleStyle={{
              fontWeight: "400",
              color: "white",
              fontSize: 14,
            }}
            buttonStyle={{
              backgroundColor: "#4b80d6",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 10,
              fontSize: 10,
              padding: 10,
              color: "white",
            }}
            containerStyle={{
              width: "60%",
              alignSelf: "center",
              marginHorizontal: 0,
              marginVertical: 0,
              marginBottom: 5,
              color: "white",
              height: 50,
              padding: 0,
            }}
          />
        </View>
        <Overlay
          // isVisible={true}
          isVisible={isPopupVisible}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          overlayBackgroundColor="red"
          width="100"
          height="auto"
          borderRadius={100}
          // onBackdropPress={toggleOverlay}
        >
          <View style={overlayStyle.Container}>
            {isPopupError == true ? (
              <Icon
                style={overlayStyle.successIcon}
                name="error"
                size={85}
                type="material"
                color="#de4028"
              />
            ) : (
              <Icon
                style={overlayStyle.successIcon}
                name="checkmark-circle"
                size={85}
                type="ionicon"
                color="#2cc7ba"
              />
            )}

            <Text style={overlayStyle.txtOverlay}>{popupMessage}</Text>
          </View>
        </Overlay>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  lblRecoverSub: {
    width: "100%",
    height: "auto",
    marginBottom: 0,
    paddingLeft: 50,
    textAlign: "center",
    paddingRight: 50,
    fontWeight: "normal",
    fontSize: 15,
    marginTop: 50,
  },
  lblRecoverMain: {
    width: "100%",
    height: "auto",
    marginBottom: 0,
    paddingLeft: 30,
    textAlign: "center",
    paddingRight: 30,
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 50,
  },
  IMGCenter: {
    alignSelf: "center",
  },
  IMGContainer: {
    width: "100%",
    height: "auto",
    marginBottom: 20,
    paddingTop: 70,
  },
  ScreenMain: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
  },
  Main: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
  },
});
const overlayStyle = StyleSheet.create({
  successIcon: {
    height: 80,
    width: 80,
    marginBottom: 30,
    color: "#4575de",
    alignSelf: "center",
  },
  txtOverlay: {
    height: "auto",
    fontWeight: "bold",
    fontSize: 15,
    color: "#4575de",
    textAlign: "center",
  },
  Container: {
    height: "auto",
    width: "90%",
    alignSelf: "center",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
});

export default ForgotPassword;
