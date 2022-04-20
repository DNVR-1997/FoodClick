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
function ViewProduct({ navigation }) {
  const [qty, setQty] = useState(1);
  const [ip, setIp] = useState("192.168.254.117");
  const [price, setPrice] = useState(navigation.getParam("food_price"));
  const [updatePrice, setUpdatePrice] = useState(price);
  const [foodImage, setFoodImage] = useState(
    navigation.getParam("food_filename")
  );

  const [name, setName] = useState(navigation.getParam("food_name"));
  const [isUpdated, setIsUpdated] = useState(false);
  const [foodDesc, setFoodDesc] = useState(
    navigation.getParam("food_description")
  );

  const addQTY = () => {
    setQty(Number(qty) + 1);
  };

  const removeQTY = () => {
    if (qty <= 1) {
    } else {
      setQty(Number(qty) - 1);
    }
  };
  const calculateTotal = () => {
    setUpdatePrice(
      Number(qty * Number(navigation.getParam("food_price"))).toFixed(2)
    );
  };

  useEffect(() => {
    calculateTotal();
  }, [qty, name]);

  return (
    <View style={styles.ViewMain}>
      <View style={styles.ViewImg}>
        <Image
          source={{
            // uri: "https://foodappcatarman.000webhostapp.com/images/images1.jpg",
            uri: `http://${ip}/foodapp/images/${navigation.getParam(
              "food_filename"
            )}`,
          }}
          style={styles.foodImg}
        />
      </View>
      <View style={styles.ViewDetails}>
        <Text style={styles.foodName}>{navigation.getParam("food_name")}</Text>
        <Text style={styles.foodDesc}>
          {navigation.getParam("food_description")}
        </Text>
        <Text style={styles.foodPrice}>
          {navigation.getParam("food_price")}
        </Text>
      </View>
      <View style={styles.QTYControlMain}>
        <TouchableOpacity style={styles.QTYControl} onPress={removeQTY}>
          <Icon
            style={styles.qtyCtrl}
            name="remove"
            size={25}
            color={"black"}
            style={{ color: "red" }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.QTYControl} onPress={addQTY}>
          <Icon
            style={styles.qtyCtrl}
            name="add"
            size={25}
            color={"black"}
            style={{ color: "red" }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.QTYViewer}>
        <Text style={styles.lblQTY}>Quantity</Text>

        <Text style={styles.lblQTYValue}>{qty}</Text>
      </View>
      <View style={styles.QTYViewer}>
        <Text style={styles.lblQTY}>Total</Text>

        <Text style={styles.lblQTYValue}>{updatePrice}</Text>
      </View>
      <TouchableOpacity style={styles.btnAddTocart}>
        <Icon
          style={styles.icnAddToCart}
          name="add-shopping-cart"
          size={25}
          color={"#4742ad"}
          style={{ color: "red" }}
        />
        <Text style={styles.txtAddToCart}>ADD TO CART</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  ViewMain: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  ViewImg: {
    width: "100%",
    height: 200,
  },
  foodImg: {
    width: "100%",
    height: "100%",
  },
  ViewDetails: {
    width: "100%",
    height: "auto",
    padding: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  foodName: {
    width: "100%",
    height: "auto",
    marginBottom: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#5f3ed6",
  },
  foodDesc: {
    width: "100%",
    height: "auto",
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "normal",
    color: "#a1a1a1",
  },
  foodPrice: {
    width: "100%",
    height: "auto",
    marginBottom: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#c92e2e",
  },
  QTYControlMain: {
    width: "100%",
    padding: 10,
    paddingRight: 20,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  QTYControl: {
    paddingRight: 14,
    paddingLeft: 14,
    paddingTop: 7,
    paddingBottom: 7,
    borderColor: "black",
    borderWidth: 1,
    marginLeft: 10,
    borderRadius: 7,
  },
  qtyCtrl: {},
  QTYViewer: {
    width: "100%",
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lblQTY: {
    paddingLeft: 0,
    paddingRight: 15,
    fontWeight: "normal",
    fontSize: 17,
    color: "#9e9e9e",
  },
  lblQTYValue: {
    paddingLeft: 15,
    paddingRight: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: "#c92e2e",
  },
  btnAddTocart: {
    width: "80%",
    alignSelf: "center",
    height: "auto",
    padding: 10,
    borderWidth: 1,
    backgroundColor: "white",
    textAlign: "center",
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#4742ad",
    borderRadius: 5,
  },
  txtAddToCart: {
    marginLeft: 15,
    color: "#4742ad",
    fontWeight: "500",
  },
});

export default ViewProduct;
