import React, { useState, useEffect } from "react";
import { render } from "react-dom";
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
  Picker,
} from "react-native";
import {
  Icon,
  Overlay,
  Tab,
  TabView,
  Input,
  Button,
} from "react-native-elements";
import global from "./global";
const Register = ({ navigation }) => {
  const [ip, setIp] = useState(global.ip);
  let [fullname, setFullname] = useState("");
  let [municipality, setMunicipality] = useState("CATARMAN");
  const [webLink, setWebLink] = useState(
    "https://foodappcatarman.000webhostapp.com"
  );
  let [selectBrgy, setSelectBrgy] = useState([]);
  let [brgy, setBrgy] = useState("");
  let [purok, setPurok] = useState("");
  let [contact, setContact] = useState("");
  let [email, setEmail] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isPopupError, setIsPopupError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const places = [
    {
      CATARMAN: [
        "Acacia",
        "Aguinaldo",
        "Airport Village",
        "Bangkerohan",
        "Baybay",
        "Bocsol",
        "Cabayhan",
        "Cag-abaca",
        "Cal-igang",
        "Calachuchi",
        "Casoy",
        "Cawayan",
        "Cervantes",
        "Cularima",
        "Daganas",
        "Dalakit",
        "Dona Pulqueria",
        "Galutan",
        "Gebalangan",
        "Gibulwagan",
        "Guba",
        "Hinatad",
        "Ipil-ipil",
        "Jose Abad Santos",
        "Jose P. Rizal",
        "Lapu-lapu",
        "Liberty",
        "Libjo",
        "Mabini",
        "Macagtas",
        "Molave",
        "Narra",
        "New Rizal",
        "Old Rizal",
        "Paticua",
        "Quezon",
        "Salvacion",
        "Sampaguita",
        "Santol",
        "Somoge",
        "Talisay",
        "Tinowaran",
        "Trangue",
        "UEP Zone 1",
        "UEP Zone 2",
        "UEP Zone 3",
        "Washington",
        "Yakal",
      ],
      MONDRAGON: [
        "Bagasbas",
        "Bugko",
        "Cablangan",
        "Cagmanaba",
        "Cahicsan",
        "Chitongco",
        "De Maria",
        "Dona Lucia",
        "Eco",
        "Flormina",
        "Hinabangan",
        "Imelda",
        "La Trinidad",
        "Makiwalo",
        "Mirador",
        "Nenita",
        "Roxas",
        "San Agustin",
        "San Antonio",
        "San Isidro",
        "San Jose",
        "San Juan",
        "Santa Catalina",
        "Talolora",
      ],
      BOBON: [
        "Acerida",
        "Arellano",
        "Balat-balud",
        "Dancalan",
        "E. Duran",
        "Gen. Lucban",
        "Jose Abad Santos",
        "Jose P. Laurel",
        "Magsaysay",
        "Calantiao",
        "Quezon",
        "Salvacion",
        "San Isidro",
        "San Juan",
        "Santa",
        "Santander",
        "Somoray",
        "Trujillo",
      ],
      PAMBUJAN: [
        "Cababtoan",
        "Cabarian",
        "Cagbigajo",
        "Canjumadal",
        "Dona Anecita",
        "Camparanga",
        "Geadgawan",
        "Ginulgan",
        "Giparayan",
        "Igot",
        "Ynaguingayan",
        "Inanahawan",
        "Manahao",
        "Paninirongan",
        "Poblacion 1",
        "Poblacion 2",
        "Poblacion 3",
        "Poblacion 4",
        "Poblacion 5",
        "Poblacion 6",
        "Poblacion 7",
        "Poblacion 8",
        "San Ramon",
        "Senogan",
        "Don Sixto",
        "Tula",
      ],
    },
  ];

  let RegisterMe = async () => {
    let getFullname = fullname;
    let getMunicipality = municipality;
    let getBrgy = brgy;
    let getPurok = purok;
    let getContact = contact;
    let getEmail = email;
    let getUsername = username;
    let getPassword = password;

    if (
      getFullname == "" ||
      getMunicipality == "" ||
      getBrgy == "" ||
      getPurok == "" ||
      getContact == "" ||
      getEmail == "" ||
      getUsername == "" ||
      getPassword == ""
    ) {
      setIsPopupError(true);
      setPopupMessage("Please fill all fields");
      setIsPopupVisible(true);
      hidePopUpMessage();
    } else {
      var loginURL = `${webLink}/foodapp/backend/user.php`;
      // var loginURL = "https://foodappcatarman.000webhostapp.com/user.php";
      var header = {
        Accept: "application/json",
      };
      var formDta = new FormData();
      formDta.append("addUser", "submit");
      formDta.append("fullname", getFullname);
      formDta.append("municipality", getMunicipality);
      formDta.append("brgy", getBrgy);
      formDta.append("purok", getPurok);
      formDta.append("contact", getContact);
      formDta.append("email", getEmail);
      formDta.append("username", getUsername);
      formDta.append("password", getPassword);
      formDta.append("usertype", "USR");
      await fetch(loginURL, {
        method: "POST",
        mode: "cors",
        body: formDta,
        headers: header,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message == "Success") {
            setIsPopupError(false);
            setPopupMessage("You are successfully registered.");
            setIsPopupVisible(true);
            hidePopUpMessage();
            navigation.navigate("Login");
          } else {
            setIsPopupError(true);
            setPopupMessage(data.message);
            setIsPopupVisible(true);
            hidePopUpMessage();
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  let hidePopUpMessage = () => {
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 2500);
  };
  useEffect(() => {
    setSelectBrgy(places[0][municipality]);
  }, [municipality]);

  let renderBrgy = selectBrgy.map((item, index) => {
    return <Picker.Item key={index} value={item} label={item} />;
  });
  return (
    <KeyboardAvoidingView style={style.RegistrationContainer}>
      <ScrollView style={profileStyle.MainScroll}>
        <Image source={require("../images/logo.png")} style={style.LogoImage} />
        <View style={profileStyle.txtLogoContainer}>
          <Image
            source={require("../images/txtLogo.png")}
            style={profileStyle.txtLogo}
          />
        </View>
        <View style={profileStyle.InputContainer}>
          <Text style={profileStyle.lblInput}>Fullname</Text>
          <Input
            style={profileStyle.input}
            placeholder="Fullname"
            onChangeText={(val) => setFullname(val)}
          />
        </View>
        <View style={profileStyle.InputContainer}>
          <Text style={profileStyle.lblInput}>Contact Number</Text>
          <Input
            style={profileStyle.input}
            maxLength={11}
            keyboardType="numeric"
            placeholder="Contact number"
            onChangeText={(val) => setContact(val)}
          />
        </View>
        <View style={profileStyle.InputContainer}>
          <Text style={profileStyle.lblInput}>Email address</Text>
          <Input
            style={profileStyle.input}
            placeholder="Email address"
            onChangeText={(val) => setEmail(val)}
          />
        </View>
        <View style={profileStyle.InputContainer}>
          <Text style={profileStyle.lblInput}>Municipality</Text>
          {/* <Input
            style={profileStyle.input}
            placeholder="Municipality"
            onChangeText={(val) => setMunicipality(val)}
          /> */}
          <Picker
            selectedValue={municipality}
            style={{
              height: 50,
              width: "100%",
              fontWeight: "bold",
              borderBottomWidth: 1,
              borderBottomColor: "black",
            }}
            onValueChange={(itemValue, itemIndex) => {
              setMunicipality(itemValue);
              setSelectBrgy(places[0][municipality]);
            }}
          >
            <Picker.Item label="BOBON" value="BOBON" />
            <Picker.Item label="CATARMAN" value="CATARMAN" />
            <Picker.Item label="MONDRAGON" value="MONDRAGON" />
            <Picker.Item label="PAMBUJAN" value="PAMBUJAN" />
          </Picker>
        </View>
        <View style={profileStyle.InputContainer}>
          <Text style={profileStyle.lblInput}>Barangay</Text>
          {/* <Input
            style={profileStyle.input}
            placeholder="Barangay"
            onChangeText={(val) => setBrgy(val)}
          /> */}
          <Picker
            selectedValue={brgy}
            style={{
              height: 50,
              width: "100%",
              fontWeight: "bold",
              borderBottomWidth: 1,
              borderBottomColor: "black",
            }}
            onValueChange={(itemValue, itemIndex) => {
              setBrgy(itemValue);
            }}
          >
            {renderBrgy}
          </Picker>
        </View>
        <View style={profileStyle.InputContainer}>
          <Text style={profileStyle.lblInput}>Purok/Street Number</Text>
          <Input
            style={profileStyle.input}
            placeholder="Purok/Street number"
            onChangeText={(val) => setPurok(val)}
          />
        </View>
        <View style={profileStyle.InputContainer}>
          <Text style={profileStyle.lblInput}>Username</Text>
          <Input
            leftIcon={{ type: "font-awesome", name: "user", color: "#3f4b8c" }}
            style={profileStyle.input}
            placeholder="Username"
            onChangeText={(val) => setUsername(val)}
          />
        </View>
        <View style={profileStyle.InputContainer}>
          <Text style={profileStyle.lblInput}>Password</Text>
          <Input
            leftIcon={{ type: "font-awesome", name: "lock", color: "#3f4b8c" }}
            rightIcon={{
              type: "feather",
              name: isPasswordVisible ? "eye" : "eye-off",
              color: "#3f4b8c",
              onPress: () => {
                setIsPasswordVisible(!isPasswordVisible);
              },
            }}
            style={profileStyle.input}
            placeholder="Password"
            secureTextEntry={isPasswordVisible}
            onChangeText={(val) => setPassword(val)}
          />
        </View>

        <Button
          style={profileStyle.btnSave}
          title="Register Me!"
          onPress={RegisterMe}
          icon={{
            name: "",
            type: "font-awesome",
            size: 25,
            color: "white",
          }}
          iconContainerStyle={{ marginRight: 10, fontSize: 40 }}
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "rgba(90, 154, 230, 1)",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 10,
            fontSize: 40,
            padding: 10,
          }}
          containerStyle={{
            width: "95%",
            alignSelf: "center",
            marginHorizontal: 0,
            marginVertical: 0,
            marginBottom: 50,
          }}
        />
      </ScrollView>
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
    </KeyboardAvoidingView>
  );
};

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
    fontSize: 20,
    color: "#4575de",
  },
  Container: {
    height: "auto",
    width: "auto",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
const profileStyle = StyleSheet.create({
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
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 20,
  },
  lblMessage: {
    width: "100%",
    marginTop: 10,
    fontSize: 14,
    color: "gray",
    marginBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnSave: {
    marginBottom: 50,
  },
  input: {
    margin: 0,
    // backgroundColor: "red",
    fontWeight: "bold",
    color: "#3f4b8c",
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
    marginBottom: 10,
    padding: 0,
    backgroundColor: "white",
  },
  MainScroll: {
    width: "100%",
    flex: 1,
    padding: 15,
    paddingTop: 20,
    paddingBottom: 0,
    backgroundColor: "white",
  },
  Main: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
  },
});
const style = StyleSheet.create({
  RegistrationContainer: {
    paddingTop: 40,
    flex: 1,
    width: "100%",
    backgroundColor: "#7625a8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  txtLogin: {
    fontSize: 20,
    paddingBottom: 10,
    fontWeight: "700",
  },
  scroller: {
    flex: 1,
    width: "100%",
    fontWeight: "700",
    backgroundColor: "white",
    padding: 0,
    // paddingTop: 30,
    paddingBottom: 30,
    display: "flex",
  },
  LogoImage: {
    width: 100,
    // objectFit: 'contain',
    height: 100,
    paddingBottom: 0,
    alignSelf: "center",
    // borderRadius: '50%',
  },
  RegForm: {
    // height: "auto",
    width: "95%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    alignSelf: "center",
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
    backgroundColor: "#ededed",
  },
  btnRegister: {
    marginBottom: 20,
  },
});
export default Register;
