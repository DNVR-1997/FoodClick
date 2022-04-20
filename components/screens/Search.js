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
} from "react-native";
import { Icon, Overlay, SearchBar } from "react-native-elements";
import global from "./global";
function Search({ navigation }) {
  const [ip, setIp] = useState(global.ip);
  const [userID, SetUserID] = useState(global.userID);
  const [searchMeal, setSearchMeal] = useState([]);
  const [txtSearch, setTxtSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [foodDetailsModal, setFoodDetailsModal] = useState(false);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [updatePrice, setUpdatePrice] = useState(price);
  const [foodImage, setFoodImage] = useState("");
  const [foodDesc, setFoodDesc] = useState("");
  const [name, setName] = useState("");
  const [selectedFoodID, setSelectedFoodID] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [webLink, setWebLink] = useState(
    "https://foodappcatarman.000webhostapp.com"
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
    setUpdatePrice(Number(qty * Number(price)).toFixed(2));
  };
  let addToCart = async () => {
    let getQTY = qty;
    let getUserID = userID;
    let getFoodID = selectedFoodID;
    console.log(getQTY + "  " + getUserID + "  " + getFoodID);
    var getURL = `${webLink}/foodapp/backend/user.php`;
    var header = {
      Accept: "application/json",
    };
    var formDta = new FormData();
    formDta.append("addToCart", "submit");
    formDta.append("userID", getUserID);
    formDta.append("foodID", getFoodID);
    formDta.append("qty", getQTY);
    await fetch(getURL, {
      method: "POST",
      mode: "cors",
      body: formDta,
      headers: header,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message == "Success") {
          setIsPopupVisible(true);
          hidePopUpMessage();
        } else {
          console.log(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchFood = async () => {
    // var getURL = "https://foodappcatarman.000webhostapp.com/food.php";
    var getURL = `${webLink}/foodapp/backend/food.php`;
    var header = {
      Accept: "application/json",
    };
    var formDta = new FormData();
    formDta.append("searchFood", "submit");
    formDta.append("search", txtSearch);
    await fetch(getURL, {
      method: "POST",
      mode: "cors",
      body: formDta,
      headers: header,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          // console.log(data);
          setSearchMeal((rev) => data);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let hidePopUpMessage = () => {
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 1500);
  };
  useEffect(() => {
    searchFood();
  }, [txtSearch]);

  useEffect(() => {
    setIsLoading(true);
    calculateTotal();
  }, [isLoading, qty]);

  let renderSearch = ({ item }) => (
    <TouchableOpacity
      style={styles.budgetFoodMealEach}
      onPress={() => {
        setFoodDetailsModal(true);
        setFoodImage(`${webLink}/foodapp/images/${item.food_filename}`);
        setName(item.food_name);
        setFoodDesc(item.food_description);
        setPrice(item.food_price);
        setUpdatePrice(price);
        setQty(1);
        setSelectedFoodID(item.food_id);
      }}
    >
      <Image
        style={styles.foodImg}
        source={{
          // uri: "https://foodappcatarman.000webhostapp.com/images/images1.jpg",
          uri: `${webLink}/foodapp/images/${item.food_filename}`,
        }}
      />
      <Text style={styles.foodname}>{item.food_name}</Text>
      <Text style={styles.foodprice}>{item.food_price}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.SearchMain}>
      <View style={styles.SearchInput}>
        <SearchBar
          placeholder="Search food here..."
          value={txtSearch}
          onChangeText={(val) => {
            setTxtSearch(val);
            searchFood();
          }}
          lightTheme={true}
        />
      </View>
      <View style={styles.SearchItems}>
        {isLoading == false ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.budgetFoodMeal}>
            <FlatList
              numColumns={2}
              style={styles.flatbudget}
              data={searchMeal}
              keyExtractor={(item) => item.food_id}
              renderItem={renderSearch}
            />
          </View>
        )}
      </View>
      <Overlay
        isVisible={isPopupVisible}
        windowBackgroundColor="rgba(255, 255, 255, .5)"
        overlayBackgroundColor="red"
        width="100"
        height="auto"
        borderRadius={100}
      >
        <View style={overlayStyle.Container}>
          <Icon
            style={overlayStyle.successIcon}
            name="checkmark-circle"
            size={85}
            type="ionicon"
            color=""
            color="#2cc7ba"
          />
          <Text style={overlayStyle.txtOverlay}>
            Food added to cart succesfully!
          </Text>
        </View>
      </Overlay>
      {/* ////////////////////////////////////
            VIEW FOOD DETAILS MODAL FORM HERE
      /////////////////////*/}
      <Modal visible={foodDetailsModal} animationType={"slide"}>
        <View style={FoodDetailsStyles.ViewMain}>
          <View style={FoodDetailsStyles.TopIcon}>
            <Icon
              onPress={() => {
                setFoodDetailsModal(false);
                setQty(0);
                setSelectedFoodID("");
              }}
              name="close"
              size={30}
              color={"black"}
              style={FoodDetailsStyles.closeModal}
            />
          </View>
          <View style={FoodDetailsStyles.ViewImg}>
            <Image
              source={{
                // uri: "https://foodappcatarman.000webhostapp.com/images/images1.jpg",
                uri: foodImage,
              }}
              style={FoodDetailsStyles.foodImg}
            />
          </View>
          <View style={FoodDetailsStyles.ViewDetails}>
            <Text style={FoodDetailsStyles.foodName}>{name}</Text>
            <Text style={FoodDetailsStyles.foodDesc}>{foodDesc}</Text>
            <Text style={FoodDetailsStyles.foodPrice}>{price}</Text>
          </View>
          <View style={FoodDetailsStyles.QTYControlMain}>
            <TouchableOpacity
              style={FoodDetailsStyles.QTYControl}
              onPress={removeQTY}
            >
              <Icon
                style={FoodDetailsStyles.qtyCtrl}
                name="remove"
                size={25}
                color={"black"}
                style={{ color: "red" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={FoodDetailsStyles.QTYControl}
              onPress={addQTY}
            >
              <Icon
                style={FoodDetailsStyles.qtyCtrl}
                name="add"
                size={25}
                color={"black"}
                style={{ color: "red" }}
              />
            </TouchableOpacity>
          </View>
          <View style={FoodDetailsStyles.QTYViewer}>
            <Text style={FoodDetailsStyles.lblQTY}>Quantity</Text>

            <Text style={FoodDetailsStyles.lblQTYValue}>{qty}</Text>
          </View>
          <View style={FoodDetailsStyles.QTYViewer}>
            <Text style={FoodDetailsStyles.lblQTY}>Total</Text>

            <Text style={FoodDetailsStyles.lblQTYValue}>{updatePrice}</Text>
          </View>
          <TouchableOpacity
            style={FoodDetailsStyles.btnAddTocart}
            onPress={addToCart}
          >
            <Icon
              style={FoodDetailsStyles.icnAddToCart}
              name="add-shopping-cart"
              size={25}
              color={"#4742ad"}
              style={{ color: "red" }}
            />
            <Text style={FoodDetailsStyles.txtAddToCart}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* ////////////////////////////////////
           VIEW FOOD DETAILS END OF MODAL FORM
      /////////////////////*/}
    </View>
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
const FoodDetailsStyles = StyleSheet.create({
  closeModal: {
    position: "relative",

    borderRadius: 5,
    backgroundColor: "green",
    height: "auto",
    width: "auto",
    alignSelf: "center",
  },
  TopIcon: {
    height: "auto",
    width: "auto",
    padding: 3,
    position: "absolute",
    top: 10,
    display: "flex",

    zIndex: 3, // works on ios
    elevation: 3, // works on android
    // backgroundColor: "rgba(52, 52, 52, 0.8)",
    backgroundColor: "white",
    borderRadius: 8,
    left: 10,
  },
  ViewMain: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    position: "relative",
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
const styles = StyleSheet.create({
  SearchMain: {
    flex: 1,
    width: "100%",
  },
  SearchInput: {
    padding: 15,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderColor: "#dedede",
  },
  inputSearch: {
    width: "100%",
    padding: 7,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#ab5fc9",
  },
  SearchItems: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    padding: 10,
  },
  foodListHeader: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#5a3dc4",
    marginTop: 15,
  },
  budgetFoodMeal: {
    width: "100%",
    backgroundColor: "white",
    display: "flex",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
  },
  budgetFoodMealEach: {
    backgroundColor: "#f7f7f7",
    borderRadius: 5,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: "48%",
    height: "auto",
    width: "45%",
    marginRight: 5,
    overflow: "hidden",
    paddingBottom: 10,
  },
  foodImg: {
    width: "100%",
    height: 90,
    marginBottom: 5,
  },
  foodname: {
    fontWeight: "bold",
    paddingLeft: 10,
    width: "100%",
    textAlign: "left",
    marginBottom: 5,
  },
  foodprice: {
    fontWeight: "bold",
    paddingLeft: 10,
    fontSize: 15,
    width: "100%",
    textAlign: "left",
    color: "#bf4949",
  },
});
export default Search;
