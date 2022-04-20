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
function Category(props) {
  return (
    <View
      style={{
        flex: 1,
        height: 100,
        width: 80,
        backgroundColor: "#f5f5f5",
        marginRight: 10,
        borderRadius: 25,
        display: "flex",
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <View
        style={{
          height: 45,
          width: 45,
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
      <Text
        style={{
          alignSelf: "center",
          fontWeight: "bold",
        }}
      >
        {props.name}
      </Text>
    </View>
  );
}

export default Category;
