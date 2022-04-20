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
  KeyboardAvoidingView,
  LogBox,
  Alert,
} from "react-native";
import {
  Icon,
  Overlay,
  Tab,
  TabView,
  Input,
  Button,
} from "react-native-elements";
import Register from "./Register";
import global from "./global";

const Login = ({ navigation }) => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  const [webLink, setWebLink] = useState(
    "https://foodappcatarman.000webhostapp.com"
  );
  const [ip, setIp] = useState(global.ip);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  let loginUser = async () => {
    let getUsername = username;
    let getPassword = password;

    if (getPassword == "" || getPassword == "") {
      alert("Enter username and password");
    } else {
      var loginURL = `${webLink}/foodapp/backend/user.php`;
      var header = {
        Accept: "application/json",
      };
      var formDta = new FormData();
      formDta.append("loginAccount", "submit");
      formDta.append("username", getUsername);
      formDta.append("password", getPassword);
      await fetch(loginURL, {
        method: "POST",
        mode: "cors",
        body: formDta,
        headers: header,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            global.userID = data[0]["userid"];
            navigation.navigate("MyTabs", {
              screen: "HomeStack",
              params: { userid: data[0]["userid"] },
            });
            // alert(global.userID);
          } else {
            alert("Failed");
          }
        })
        .catch((err) => {
          Alert(err);
        });
    }
  };
  let gotoRegistration = async () => {
    navigation.navigate("Register");
  };
  const gotoForgotPassword = async () => {
    navigation.navigate("ForgotPassword");
  };
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    global.ip = "192.168.254.111";
    setIp(global.ip);
  }, []);
  return (
    <KeyboardAvoidingView style={style.LoginContainer}>
      <ScrollView style={Loginstyle.MainContainer}>
        <View style={Loginstyle.TopColor}>
          <View style={Loginstyle.LogoContainerCircle}>
            <View style={Loginstyle.LogoContainer}>
              <Image
                source={require("../images/logo.png")}
                style={Loginstyle.LogoImage}
              />
            </View>
          </View>
          <View style={Loginstyle.txtLogoContainer}>
            <Image
              source={require("../images/txtLogo.png")}
              style={Loginstyle.txtLogo}
            />
          </View>
        </View>
        <View style={Loginstyle.BottomColor}>
          <Text style={Loginstyle.txtLogin}>Login</Text>
          <View style={Loginstyle.loginFormContainer}>
            <View style={Loginstyle.InputContainer}>
              <Text style={Loginstyle.lblInput}>Username</Text>
              <Input
                leftIcon={{
                  type: "font-awesome",
                  name: "user",
                  color: "#5996ff",
                  style: { marginRight: 10 },
                }}
                style={Loginstyle.input}
                placeholder="Username"
                value={username}
                onChangeText={(val) => setUsername(val)}
              />
            </View>
            <View style={Loginstyle.InputContainer}>
              <Text style={Loginstyle.lblInput}>Password</Text>
              <Input
                leftIcon={{
                  type: "font-awesome",
                  name: "lock",
                  color: "#5996ff",
                  style: { marginRight: 10 },
                }}
                rightIcon={{
                  type: "feather",
                  name: isPasswordVisible ? "eye" : "eye-off",
                  color: "#5996ff",
                  onPress: () => {
                    setIsPasswordVisible(!isPasswordVisible);
                  },
                }}
                value={password}
                style={Loginstyle.input}
                placeholder="Password"
                secureTextEntry={isPasswordVisible}
                onChangeText={(val) => setPassword(val)}
              />
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  style={Loginstyle.btnSave}
                  title="Forgot password?"
                  onPress={gotoForgotPassword}
                  icon={{
                    name: "",
                    type: "font-awesome",
                    size: 25,
                    color: "white",
                  }}
                  iconContainerStyle={{ marginRight: 0, fontSize: 10 }}
                  titleStyle={{
                    fontWeight: "400",
                    color: "black",
                    fontSize: 12,
                  }}
                  buttonStyle={{
                    backgroundColor: "white",
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 10,
                    fontSize: 10,
                    padding: 0,
                    color: "black",
                  }}
                  containerStyle={{
                    width: "auto",
                    alignSelf: "center",
                    marginHorizontal: 0,
                    marginVertical: 0,
                    marginBottom: 5,
                    color: "black",
                    height: 40,
                    padding: 0,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Button
                style={Loginstyle.btnSave}
                title="Sign in"
                onPress={loginUser}
                icon={{
                  name: "",
                  type: "font-awesome",
                  size: 0,
                  color: "white",
                }}
                iconContainerStyle={{ marginRight: 0, fontSize: 40 }}
                titleStyle={{ fontWeight: "700", fontSize: 13 }}
                buttonStyle={{
                  backgroundColor: "rgba(90, 154, 230, 1)",
                  borderColor: "transparent",
                  borderWidth: 0,
                  borderRadius: 5,
                  fontSize: 40,
                  padding: 0,
                  height: 35,
                }}
                containerStyle={{
                  width: "30%",
                  alignSelf: "center",
                  marginHorizontal: 0,
                  marginVertical: 0,
                  marginBottom: 20,
                  height: 40,
                }}
              />
              <Button
                style={Loginstyle.btnSave}
                title="Create an account"
                onPress={gotoRegistration}
                icon={{
                  name: "",
                  type: "font-awesome",
                  size: 0,
                  color: "white",
                }}
                iconContainerStyle={{ marginRight: 0, fontSize: 40 }}
                titleStyle={{ fontWeight: "700", fontSize: 13 }}
                buttonStyle={{
                  backgroundColor: "#e68619",
                  borderColor: "transparent",
                  borderWidth: 0,
                  borderRadius: 5,
                  fontSize: 40,
                  padding: 0,
                  height: 35,
                }}
                containerStyle={{
                  width: "50%",
                  alignSelf: "center",
                  marginHorizontal: 0,
                  marginVertical: 0,
                  marginBottom: 20,
                  height: 40,
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* <View style={style.LoginForm}>
        <Image source={require("../images/logo.png")} style={style.LogoImage} />
        <Text style={style.txtLogin}>Login </Text>
        <View style={style.inputContainer}>
          <Text style={style.lbl}>Username </Text>
          <TextInput
            style={style.txtFields}
            onChangeText={(val) => setUsername(val)}
          />
          <Text style={style.lbl}>Password </Text>
          <TextInput
            style={style.txtFields}
            onChangeText={(val) => setPassword(val)}
          />
          <Button style={style.btnLogin} title="Login" onPress={loginUser} />
        </View>
      </View>
      <Text style={style.lblRegister} onPress={gotoRegistration}>
        Register Account{" "}
      </Text> */}
    </KeyboardAvoidingView>
  );
};
const Loginstyle = StyleSheet.create({
  btnSave: {
    marginBottom: 10,
  },
  input: {
    margin: 0,
    // backgroundColor: "red",
    fontWeight: "bold",
    backgroundColor: "white",
    color: "#5996ff",
  },
  lblInput: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 0,
    color: "gray",
    paddingLeft: 10,
  },
  InputContainer: {
    width: "100%",
    marginBottom: 0,
    padding: 0,
    backgroundColor: "white",
    paddingBottom: 0,
  },
  loginFormContainer: {
    height: "auto",
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
  },
  txtLogin: {
    width: "100%",
    marginBottom: 30,
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  BottomColor: {
    // flex: 1,
    position: "relative",
    backgroundColor: "white",
    alignSelf: "center",
    width: "90%",
    height: "auto",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
    // minHeight: 4000,
  },
  txtLogo: {
    flex: 1,
    width: 200,
    height: null,
    resizeMode: "contain",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  txtLogoContainer: {
    width: 200,
    height: 40,
    alignSelf: "center",
    position: "absolute",
    bottom: 10,
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: "#5996ff",
  },
  LogoImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  LogoContainer: {
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: "#5287e3",
  },
  LogoContainerCircle: {
    height: 160,
    width: 160,
    backgroundColor: "#5996ff",
    borderRadius: 80,
    alignSelf: "center",
    position: "absolute",
    top: "20%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  TopColor: {
    // flex: 1,
    // backgroundColor: "#9024d4",
    backgroundColor: "#4980de",
    width: "100%",
    height: "35%",
    position: "relative",
    minHeight: 240,
  },
  MainContainer: {
    width: "100%",
    flex: 1,
    height: "auto",
  },
});
const style = StyleSheet.create({
  LoginContainer: {
    flex: 1,
    height: "auto",
    width: "100%",
    backgroundColor: "#4980de",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  txtLogin: {
    fontSize: 20,
    paddingBottom: 10,
    fontWeight: "700",
  },
  LogoImage: {
    width: 100,
    // objectFit: 'contain',
    height: 100,
    paddingBottom: 0,
    // borderRadius: '50%',
  },
  LoginForm: {
    // height: "auto",
    width: "90%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    // placeItems: 'center',
    padding: 15,
    // paddingLeft: 20,
    // paddingRight: 20,
  },
  inputContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
  },
  lbl: {
    marginBottom: 5,
  },
  lblRegister: {
    position: "absolute",
    bottom: 15,
    marginBottom: 5,
    fontWeight: "700",
    color: "white",
    // cursor: 'pointer',
  },
  txtFields: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    borderRadius: 4,
    padding: 7,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    marginBottom: 15,
    borderColor: "#98a5b3",
    backgroundColor: "#4980de",
  },
});
export default Login;
