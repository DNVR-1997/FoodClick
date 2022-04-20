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
  RefreshControl,
  LogBox,
  KeyboardAvoidingView,
} from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import {
  createStackNavigation,
  createStackNavigator,
} from "react-navigation-stack";
import { Icon, Overlay, SearchBar } from "react-native-elements";
import Category from "./HomeComponents/Category";
import Stores from "./HomeComponents/Stores";
import { render } from "react-dom";
import global from "./global";
import Establishment from "./Establishment";
import HomeMain from "./HomeMain";
const HomeNav = ({ navigation }) => {
  // VARIABLES
  // ==========================================
  const [ip, setIp] = useState(global.ip);
  const [userID, setUserID] = useState(navigation.getParam("userid"));
  // const [userID, SetUserID] = useState("8");
  const [stores, setStores] = useState([]);
  const [budgetMeal, setBudgetMeal] = useState([]);
  const [largetMeal, setLargeMeal] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [foodDetailsModal, setFoodDetailsModal] = useState(false);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [updatePrice, setUpdatePrice] = useState(price);
  const [foodImage, setFoodImage] = useState("");
  const [foodDesc, setFoodDesc] = useState("");
  const [name, setName] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedFoodID, setSelectedFoodID] = useState("");
  const [isRefresh, setIsRefresh] = useState(false);
  // ==========================================
  // END VARIABLES
  const getBudgetMeal = async () => {
    // var getURL = "https://foodappcatarman.000webhostapp.com/food.php";
    var getURL = `http:/${ip}:8080/foodapp/backend/food.php`;
    var header = {
      Accept: "application/json",
    };
    var formDta = new FormData();
    formDta.append("getBudgetMeal", "submit");
    await fetch(getURL, {
      method: "POST",
      mode: "cors",
      body: formDta,
      headers: header,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setBudgetMeal((rev) => data);
          setIsLoading(true);
        } else {
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  const getLargeMeal = async () => {
    // var getURL = "https://foodappcatarman.000webhostapp.com/food.php";
    var getURL = `http://${ip}:8080/foodapp/backend/food.php`;
    var header = {
      Accept: "application/json",
    };
    var formDta = new FormData();
    formDta.append("getLargeMeal", "submit");
    await fetch(getURL, {
      method: "POST",
      mode: "cors",
      body: formDta,
      headers: header,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setLargeMeal((rev) => data);
        } else {
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  const getStores = async () => {
    // var getURL = "https://foodappcatarman.000webhostapp.com/establishment.php";
    var getURL = `http://${ip}:8080/foodapp/backend/establishment.php`;
    var header = {
      Accept: "application/json",
    };
    var formDta = new FormData();
    formDta.append("getAllEstablishments", "submit");
    await fetch(getURL, {
      method: "POST",
      mode: "cors",
      body: formDta,
      headers: header,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setStores((rev) => data);
        } else {
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
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
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

    calculateTotal();
    global.ip = "192.168.254.109";
    setIp(global.ip);
    global.userID = "8";
    setUserID(global.userID);
  }, [isLoading, qty, selectedFoodID]);
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, [isRefresh]);

  let renderBudgetItem = ({ item }) => (
    <TouchableOpacity
      style={styles.budgetFoodMealEach}
      onPress={() => {
        setFoodDetailsModal(true);
        setFoodImage(`http:/${ip}:8080/foodapp/images/${item.food_filename}`);
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
          uri: `http://${ip}:8080/foodapp/images/${item.food_filename}`,
        }}
      />
      <Text style={styles.foodname}>{item.food_name}</Text>
      <Text style={styles.foodprice}>{item.food_price}</Text>
    </TouchableOpacity>
  );
  let renderEstablishment = ({ item }) => (
    <TouchableOpacity style={styles.est_Container}>
      <View style={styles.est_IMGContainer}>
        <Image
          style={styles.estLogo}
          source={{
            // uri: `https://foodappcatarman.000webhostapp.com/images/${item.est_name}.png`,
            uri: `http://${ip}:8080/foodapp/images/${item.est_file_name}`,
          }}
        />
      </View>
    </TouchableOpacity>
  );
  let renderLargeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.budgetFoodMealEach}
      onPress={() => {
        setFoodDetailsModal(true);
        setFoodImage(`http:/${ip}:8080/foodapp/images/${item.food_filename}`);
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
          uri: `http:/${ip}:8080/foodapp/images/${item.food_filename}`,
        }}
      />
      <Text style={styles.foodname}>{item.food_name}</Text>
      <Text style={styles.foodprice}>{item.food_price}</Text>
    </TouchableOpacity>
  );
  let refreshData = () => {
    getStores();
    getBudgetMeal();
    getLargeMeal();
  };
  let addToCart = async () => {
    let getQTY = qty;
    let getUserID = userID;
    let getFoodID = selectedFoodID;
    var getURL = `http:/${ip}:8080/foodapp/backend/user.php`;
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
          alert(data.message);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  let hidePopUpMessage = () => {
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView style={styles.HomeMain}>
      <View style={styles.LogoTop}>
        <TouchableOpacity
          style={styles.SearchInput}
          onPress={() => navigation.navigate("Search")}
        >
          {/* <TextInput
            onPressIn={() => navigation.navigate("Search")}
            style={styles.inputSearch}
            placeholder="Search food"
          /> */}
          <SearchBar
            placeholder="Search food here..."
            onPress={() => navigation.navigate("Search")}
            onFocus={() => navigation.navigate("Search")}
            lightTheme={true}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={refreshData} />
        }
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: "white",
          paddingTop: 5,
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom: 30,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            paddingTop: 10,
          }}
        >
          Categories
        </Text>
        <View
          style={{
            width: "100%",
            height: 100,
            backgroundColor: "white",
            marginTop: 10,
          }}
        >
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            <Category
              name="Pizza"
              imageSource={require("../images/pizza.png")}
            />
            <Category
              name="Milk Tea"
              imageSource={require("../images/bubble-tea.png")}
            />
            <Category
              name="Hamburger"
              imageSource={require("../images/hamburger.png")}
            />
            <Category
              name="Spaghetti"
              imageSource={require("../images/pasta.png")}
            />
            <Category
              name="Drinks"
              imageSource={require("../images/drink.png")}
            />
            <Category
              name="Chicken"
              imageSource={require("../images/chicken.png")}
            />
          </ScrollView>
        </View>
        <Text
          style={{
            fontWeight: "bold",
            paddingTop: 20,
          }}
        >
          Stores
        </Text>
        <View
          style={{
            width: "100%",
            height: 100,
            backgroundColor: "white",
            marginTop: 10,
          }}
        >
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {stores.map((element, index) => {
              return (
                <Stores
                  onPress={() => {
                    navigation.navigate("Establishment", {
                      userID: userID,
                      est_id: element.est_id,
                      est_file_name: element.est_file_name,
                    });
                  }}
                  key={index}
                  name={element.est_name}
                  imageSource={{
                    uri: `http://${ip}:8080/foodapp/images/${element.est_file_name}`,
                  }}
                />
              );
            })}
          </ScrollView>
        </View>
        <View
          style={{
            width: "100%",
            height: 90,
            backgroundColor: "white",
            marginTop: 10,
            paddingRight: 10,
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: "white",
              marginTop: 10,
              paddingRight: 10,
              alignSelf: "center",
            }}
          >
            <Image
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: "contain",
              }}
              source={require("../images/piggy-bank.png")}
            />
          </View>
        </View>
        <Text
          style={{
            fontWeight: "bold",
            paddingTop: 0,
            fontSize: 20,
            width: "100%",
            textAlign: "center",
          }}
        >
          Budget Price
        </Text>
        <View
          style={{
            width: "100%",
            height: "auto",
            backgroundColor: "white",
            marginTop: 10,
            paddingRight: 10,
          }}
        >
          {isLoading == false ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.budgetFoodMeal}>
              <FlatList
                numColumns={2}
                style={styles.flatbudget}
                data={budgetMeal}
                keyExtractor={(item) => item.food_id}
                renderItem={renderBudgetItem}
              />
            </View>
          )}
        </View>
        <Text
          style={{
            fontWeight: "bold",
            paddingTop: 20,
          }}
        >
          Other foods
        </Text>
        <View
          style={{
            width: "100%",
            height: 400,
            backgroundColor: "white",
            marginTop: 10,
            paddingRight: 10,
          }}
        >
          {isLoading == false ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.budgetFoodMeal}>
              <FlatList
                numColumns={2}
                style={styles.flatbudget}
                data={largetMeal}
                keyExtractor={(item) => item.food_id}
                renderItem={renderLargeItem}
              />
            </View>
          )}
        </View>
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
  HomeMain: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    overflow: "scroll",
  },
  LogoTop: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 10,
    // borderBottomWidth: 4,
    // borderBottomColor: "#db3535",
  },
  LogoImage: {
    width: 80,
    height: 80,
  },
  lblLogo: {
    fontWeight: "bold",
    color: "black",
  },
  SearchInput: {
    width: "100%",
    padding: 15,
    paddingTop: 30,
    borderBottomWidth: 1,
    borderColor: "#ebebeb",
  },
  inputSearch: {
    width: "100%",
    padding: 7,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#ab5fc9",
  },
  foodList: {
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
    alignSelf: "center",
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
    borderWidth: 1,
    borderColor: "#d6d6d6",
    marginBottom: 10,
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
  est_Container: {
    padding: 10,
    backgroundColor: "#f5f5f5",
    display: "flex",
    borderRadius: 5,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: "48%",
    height: "auto",
    width: "100%",
    marginRight: 5,
    overflow: "hidden",
    resizeMode: "cover",
    marginBottom: 10,
  },
  est_IMGContainer: {
    height: 90,
    width: 100,
    alignSelf: "center",
  },
  estLogo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
});

const screens = {
  HomeNav: {
    screen: HomeNav,
    navigationOptions: {
      header: null,
      activeColor: "white",
      inactiveColor: "white",
      barStyle: {
        backgroundColor: "white",
        borderTopWidth: 2,
        borderTopColor: "#dedede",
      },
      tabBarIcon: <Icon name="home" size={25} style={{ color: "red" }} />,
    },
  },
  Establishment: {
    screen: Establishment,
    navigationOptions: {
      header: null,
      tabBarLabel: "Search",
      activeColor: "#a62b2b",
      inactiveColor: "#000000",

      barStyle: {
        backgroundColor: "white",
        borderTopWidth: 2,
        borderTopColor: "#dedede",
      },
      tabBarIcon: <Icon name="search" size={25} style={{ color: "red" }} />,
    },
  },
};
const stackNavigator = createStackNavigator(screens);
export default createAppContainer(stackNavigator);
