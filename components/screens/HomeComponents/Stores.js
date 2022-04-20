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
function Stores(props, { navigation }) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      key={props.key}
      style={{
        flex: 1,
        height: 100,
        width: 100,
        backgroundColor: "#e3f4ff",
        marginRight: 10,
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <View
        style={{
          height: 65,
          width: 65,
          display: "flex",
          marginRight: 0,
          borderRadius: 10,
          alignSelf: "center",
          marginBottom: 10,
        }}
      >
        <Image
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: "contain",
          }}
          source={props.imageSource}
        />
      </View>
      {/* <Text
        style={{
          alignSelf: "center",
          fontWeight: "bold",
        }}
      >
        {props.name}
      </Text> */}
    </TouchableOpacity>
  );
}

export default Stores;
