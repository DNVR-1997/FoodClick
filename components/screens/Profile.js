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

function Profile({ route, navigation }) {
  let { user_ID } = route.params;
  const [ip, setIp] = useState(global.ip);
  const [webLink, setWebLink] = useState(
    "https://foodappcatarman.000webhostapp.com"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectBrgy, setSelectBrgy] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isPopupError, setIsPopupError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [userDetails, setUserDetails] = useState({
    userID: user_ID,
    fullname: "",
    contact: "",
    email: "",
    municipality: "",
    brgy: "",
    purok: "",
    username: "",
    password: "",
  });
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

  let hidePopUpMessage = () => {
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 2500);
  };
  let renderBrgy = selectBrgy.map((item, index) => {
    return <Picker.Item key={index} value={item} label={item} />;
  });
  let UpdateProfile = async () => {
    let userID = userDetails.userID;
    let fullname = userDetails.fullname;
    let contact = userDetails.contact;
    let email = userDetails.email;
    let municipality = userDetails.municipality;
    let brgy = userDetails.brgy;
    let purok = userDetails.purok;
    let username = userDetails.username;
    let password = userDetails.password;
    if (
      userID == "" ||
      fullname == "" ||
      contact == "" ||
      email == "" ||
      municipality == "" ||
      brgy == "" ||
      purok == "" ||
      username == "" ||
      password == ""
    ) {
      setIsPopupError(true);
      setPopupMessage("Please fill all fields");
      setIsPopupVisible(true);
      hidePopUpMessage();
    } else {
      // var loginURL = "https://foodappcatarman.000webhostapp.com/user.php";
      var getURL = `${webLink}/foodapp/backend/user.php`;
      var header = {
        Accept: "application/json",
      };
      var formDta = new FormData();
      formDta.append("editUser", "submit");
      formDta.append("fullname", fullname);
      formDta.append("municipality", municipality);
      formDta.append("brgy", brgy);
      formDta.append("purok", purok);
      formDta.append("contact", contact);
      formDta.append("email", email);
      formDta.append("username", username);
      formDta.append("password", password);
      formDta.append("id", userID);
      await fetch(getURL, {
        method: "POST",
        mode: "cors",
        body: formDta,
        headers: header,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message == "Success") {
            setIsPopupError(false);
            setPopupMessage("Profile updated successfully!");
            setIsPopupVisible(true);
            hidePopUpMessage();
            getMyDetails();
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
  const getMyDetails = async () => {
    // var getURL = "https://foodappcatarman.000webhostapp.com/food.php";
    var getURL = `${webLink}/foodapp/backend/user.php`;
    var header = {
      Accept: "application/json",
    };
    var formDta = new FormData();
    formDta.append("getUserDetailsByID", "submit");
    formDta.append("userID", userDetails.userID);
    await fetch(getURL, {
      method: "POST",
      mode: "cors",
      body: formDta,
      headers: header,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setUserDetails((prevState) => ({
            ...prevState,
            userID: data[0]["userid"],
            fullname: data[0]["fullname"],
            contact: data[0]["contact"],
            email: data[0]["email"],
            municipality: data[0]["municipality"],
            brgy: data[0]["brgy"],
            purok: data[0]["purok"],
            username: data[0]["username"],
            password: data[0]["password_"],
          }));
          setSelectBrgy(places[0][data[0]["municipality"]]);
          setIsLoading(true);
        } else {
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    getMyDetails();
    // setSelectBrgy(places[0][userDetails.municipality]);
  }, [isLoading]);
  useEffect(() => {}, [userDetails]);
  return (
    <KeyboardAvoidingView style={profileStyle.Main}>
      <ScrollView style={profileStyle.MainScroll}>
        <View style={profileStyle.InputContainer}>
          <Text style={profileStyle.lblInput}>Fullname</Text>
          <Input
            style={profileStyle.input}
            placeholder="Fullname"
            value={userDetails.fullname}
            onChangeText={(val) => {
              setUserDetails((prevValue) => {
                return {
                  userID: prevValue.userID,
                  fullname: val,
                  contact: prevValue.contact,
                  email: prevValue.email,
                  municipality: prevValue.municipality,
                  brgy: prevValue.brgy,
                  purok: prevValue.purok,
                  username: prevValue.username,
                  password: prevValue.password,
                };
              });
            }}
          />
        </View>
        <View style={profileStyle.InputContainer}>
          <Text style={profileStyle.lblInput}>Contact Number</Text>
          <Input
            style={profileStyle.input}
            maxLength={11}
            keyboardType="numeric"
            placeholder="Contact number"
            value={userDetails.contact}
            onChangeText={(val) => {
              setUserDetails((prevValue) => {
                return {
                  userID: prevValue.userID,
                  fullname: prevValue.fullname,
                  contact: val,
                  email: prevValue.email,
                  municipality: prevValue.municipality,
                  brgy: prevValue.brgy,
                  purok: prevValue.purok,
                  username: prevValue.username,
                  password: prevValue.password,
                };
              });
            }}
          />
        </View>
        <View style={profileStyle.InputContainer}>
          <Text style={profileStyle.lblInput}>Email address</Text>
          <Input
            style={profileStyle.input}
            placeholder="Email address"
            value={userDetails.email}
            onChangeText={(val) => {
              setUserDetails((prevValue) => {
                return {
                  userID: prevValue.userID,
                  fullname: prevValue.fullname,
                  contact: prevValue.contact,
                  email: val,
                  municipality: prevValue.municipality,
                  brgy: prevValue.brgy,
                  purok: prevValue.purok,
                  username: prevValue.username,
                  password: prevValue.password,
                };
              });
            }}
          />
        </View>
        <View style={profileStyle.InputContainer}>
          <Text style={profileStyle.lblInput}>Municipality</Text>
          {/* <Input
            style={profileStyle.input}
            placeholder="Municipality"
            value={userDetails.municipality}
            onChangeText={(val) => {
              setUserDetails((prevValue) => {
                return {
                  userID: prevValue.userID,
                  fullname: prevValue.fullname,
                  contact: prevValue.contact,
                  email: prevValue.email,
                  municipality: val,
                  brgy: prevValue.brgy,
                  purok: prevValue.purok,
                  username: prevValue.username,
                  password: prevValue.password,
                };
              });
            }}
          /> */}
          <Picker
            selectedValue={userDetails.municipality}
            style={{
              height: 50,
              width: "100%",
              fontWeight: "bold",
              borderBottomWidth: 1,
              borderBottomColor: "black",
            }}
            onValueChange={(val) => {
              setUserDetails((prevValue) => {
                return {
                  userID: prevValue.userID,
                  fullname: prevValue.fullname,
                  contact: prevValue.contact,
                  email: prevValue.email,
                  municipality: val,
                  brgy: prevValue.brgy,
                  purok: prevValue.purok,
                  username: prevValue.username,
                  password: prevValue.password,
                };
              });
              setSelectBrgy(places[0][userDetails.municipality]);
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
            value={userDetails.brgy}
            onChangeText={(val) => {
              setUserDetails((prevValue) => {
                return {
                  userID: prevValue.userID,
                  fullname: prevValue.fullname,
                  contact: prevValue.contact,
                  email: prevValue.email,
                  municipality: prevValue.municipality,
                  brgy: val,
                  purok: prevValue.purok,
                  username: prevValue.username,
                  password: prevValue.password,
                };
              });
            }}
          /> */}
          <Picker
            selectedValue={userDetails.brgy}
            style={{
              height: 50,
              width: "100%",
              fontWeight: "bold",
              borderBottomWidth: 1,
              borderBottomColor: "black",
            }}
            onValueChange={(val) => {
              setUserDetails((prevValue) => {
                return {
                  userID: prevValue.userID,
                  fullname: prevValue.fullname,
                  contact: prevValue.contact,
                  email: prevValue.email,
                  municipality: prevValue.municipality,
                  brgy: val,
                  purok: prevValue.purok,
                  username: prevValue.username,
                  password: prevValue.password,
                };
              });
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
            value={userDetails.purok}
            onChangeText={(val) => {
              setUserDetails((prevValue) => {
                return {
                  userID: prevValue.userID,
                  fullname: prevValue.fullname,
                  contact: prevValue.contact,
                  email: prevValue.email,
                  municipality: prevValue.municipality,
                  brgy: prevValue.brgy,
                  purok: val,
                  username: prevValue.username,
                  password: prevValue.password,
                };
              });
            }}
          />
        </View>
        <View style={profileStyle.InputContainer}>
          <Text style={profileStyle.lblInput}>Username</Text>
          <Input
            leftIcon={{ type: "font-awesome", name: "user", color: "#3f4b8c" }}
            style={profileStyle.input}
            placeholder="Username"
            value={userDetails.username}
            onChangeText={(val) => {
              setUserDetails((prevValue) => {
                return {
                  userID: prevValue.userID,
                  fullname: prevValue.fullname,
                  contact: prevValue.contact,
                  email: prevValue.email,
                  municipality: prevValue.municipality,
                  brgy: prevValue.brgy,
                  purok: prevValue.purok,
                  username: val,
                  password: prevValue.password,
                };
              });
            }}
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
            value={userDetails.password}
            secureTextEntry={isPasswordVisible}
            onChangeText={(val) => {
              setUserDetails((prevValue) => {
                return {
                  userID: prevValue.userID,
                  fullname: prevValue.fullname,
                  contact: prevValue.contact,
                  email: prevValue.email,
                  municipality: prevValue.municipality,
                  brgy: prevValue.brgy,
                  purok: prevValue.purok,
                  username: prevValue.username,
                  password: val,
                };
              });
            }}
          />
        </View>
        <Text style={profileStyle.lblMessage}>
          * Any chnages in these fields will be save after clicking the button
          below
        </Text>
        <Button
          style={profileStyle.btnSave}
          title="Save Profile"
          onPress={UpdateProfile}
          icon={{
            name: "save",
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
            fontSize: 30,
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
              color=""
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
}

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
export default Profile;
