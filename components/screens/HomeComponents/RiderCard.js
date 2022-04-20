import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  Image,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
function RiderCard(props) {
  const [ip, setIp] = useState("192.168.254.112");
  return (
    <View style={styles.ViewMain}>
      <View style={styles.RiderIcon}>
        <View style={styles.RiderIconContainer}>
          <Image
            style={styles.riderimg}
            source={props.imageSource}
            // uri: "https://foodappcatarman.000webhostapp.com/images/images1.jpg",
            // uri: `http://${ip}:80/foodapp/images/delivery-man.png`,
          />
        </View>
        <Text>Delivery fee</Text>
      </View>
      <View style={styles.paymentA}>
        <Text style={styles.txtDeliveryFee}>P50.00</Text>
        <Text style={styles.txtSubDeliveryFee}>Within Catarman</Text>
      </View>
      <View style={styles.paymentB}>
        <Text style={styles.txtDeliveryFee}>P100.00</Text>
        <Text style={styles.txtSubDeliveryFee}>Outside Catarman</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  txtSubDeliveryFee: {
    fontSize: 13,
  },
  txtDeliveryFee: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#f09329",
  },
  riderimg: {
    position: "relative",
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
    // alignSelf: "center",
  },
  RiderIconContainer: {
    height: 70,
    width: 70,
  },
  paymentB: {
    flexBasis: "33%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  paymentA: {
    flexBasis: "33%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  RiderIcon: {
    flexBasis: "34%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  ViewMain: {
    backgroundColor: "#def0ff",
    display: "flex",
    flexDirection: "row",
    height: 120,
    borderRadius: 7,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#cedfed",
  },
});

export default RiderCard;
