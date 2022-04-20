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
} from "react-native";
function OrderList(props) {
  return (
    <View style={List.main}>
      <View style={List.estLogo}>
        <View style={List.imgCont}>
          <Image
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: "contain",
            }}
            source={props.ImageSource}
          />
        </View>
      </View>
      <View style={List.orderDetailsContainer}>
        <Text style={List.txtOrderID}>{props.orderID}</Text>
        <Text style={List.txtOrderItems}>{props.Items}</Text>
        <Text style={List.txtOrderItems}>Total amount: {props.total}</Text>
      </View>
    </View>
  );
}

const List = StyleSheet.create({
  txtOrderItems: {
    width: "100%",
    height: "auto",
    textAlign: "left",
    fontWeight: "normal",
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  txtOrderID: {
    // width: "100%",
    height: "auto",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 18,
    color: "#6532d1",
  },
  orderDetailsContainer: {
    padding: 5,
    paddingLeft: 10,
    width: "80%",
    // flex:1,
    alignSelf: "stretch",
    backgroundColor: "white",
  },
  imgCont: {
    width: 60,
    height: 60,
    backgroundColor: "white",
    borderRadius: 30,
  },
  estLogo: {
    flexBasis: 80,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    display: "flex",
    width: "94%",
    height: "auto",
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    marginTop: 5,
    borderColor: "#d5c2ff",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
});
export default OrderList;
