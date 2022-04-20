import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
// import CheckBox from "@react-native-community/checkbox";
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
  SectionList,
  LogBox,
  RefreshControl,
} from "react-native";
import { Icon, Overlay, CheckBox } from "react-native-elements";
import RiderCard from "./HomeComponents/RiderCard";
import global from "./global";
function Cart({ navigation }) {
  const [ip, setIp] = useState(global.ip);
  const [webLink, setWebLink] = useState(
    "https://foodappcatarman.000webhostapp.com"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [userID, setUserID] = useState(global.userID);
  const [updateQtyType, setUpdateQtyType] = useState("");
  const [userMunicipality, setUserMunicipality] = useState("");
  const [selectedFoodID, setSelectedFoodID] = useState("");
  const [totalFoodAmount, setTotalFoodAmount] = useState(Number(0).toFixed(2));
  const [cartOne, setCartOne] = useState([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const [foodsToOrder, setFoodsToOrder] = useState([]);
  const [countSelectedFood, setCountSelectedFood] = useState(0);
  const [btnCartEnable, setBtnCartEnable] = useState(false);
  let [fullname, setFullname] = useState("");
  let [address, setAddress] = useState("");
  let [deliveryFee, setDeliveryFee] = useState("");
  const [isOrderDetailsModalHidden, setIsOrderDetailsModalHidden] =
    useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isPopupError, setIsPopupError] = useState(false);

  const getMyDetails = async () => {
    // var getURL = "https://foodappcatarman.000webhostapp.com/food.php";
    var getURL = `${webLink}/foodapp/backend/user.php`;
    var header = {
      Accept: "application/json",
    };
    var formDta = new FormData();
    formDta.append("getUserDetailsByID", "submit");
    formDta.append("userID", userID);
    await fetch(getURL, {
      method: "POST",
      mode: "cors",
      body: formDta,
      headers: header,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          let address = `${data[0]["purok"]}, BRGY. ${data[0]["brgy"]}, ${data[0]["municipality"]}`;
          setFullname(data[0]["fullname"]);
          setAddress(address);
          setUserMunicipality(data[0]["municipality"]);
          console.log(userMunicipality);
          setDeliveryFee(
            userMunicipality == "Catarman" || userMunicipality == "CATARMAN"
              ? "50.00"
              : "100.00"
          );
          // setIsLoading(true);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getMyCart = async () => {
    var userid = userID;
    var getURL = `${webLink}/foodapp/backend/user.php`;
    var header = {
      Accept: "application/json",
    };
    var formDta = new FormData();
    formDta.append("getMyCart2", "submit");
    formDta.append("userID", userid);
    await fetch(getURL, {
      method: "POST",
      mode: "cors",
      body: formDta,
      headers: header,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data.length > 0) {
          let getData = data.replace(/\\/g, "");
          let removePre = getData.replace('{"cart":', "").slice(0, -1);
          let removestr = removePre.replace(/:"/g, ":");
          let fintlStr = removestr.replace(/]"}/g, "]}");
          let MyCart = [];
          MyCart = JSON.parse(fintlStr)[0].CART;
          setCartOne(MyCart);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateFoodQty = async () => {
    var userid = userID;
    var food_id = selectedFoodID;
    var updateType = updateQtyType;
    var getURL = `${webLink}/foodapp/backend/food.php`;
    var header = {
      Accept: "application/json",
    };
    var formDta = new FormData();
    formDta.append("updateFoodQty", "submit");
    formDta.append("userID", userid);
    formDta.append("foodID", food_id);
    formDta.append("updateType", updateType);
    // await fetch(getURL, {
    //   method: "POST",
    //   mode: "cors",
    //   body: formDta,
    //   headers: header,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.message == "Success") {
    //       getMyCart();
    //     } else {
    //       alert(data.message);
    //     }
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
  };

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    getMyCart();
    getMyDetails();
    // getMyCartRestaurants();
  }, [isLoading]);
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    setIsCartLoaded(true);
  }, [cartOne]);
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    calculateTotal();
  }, [cartOne]);
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    // updateFoodQty();
  }, [updateQtyType]);
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, [foodsToOrder]);
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, [isRefresh]);

  let renderSelectedFoods = ({ item, index }) => {
    return (
      <TouchableOpacity style={cartListStyle.cartFood}>
        <View style={cartListStyle.foodIMGContainer}>
          <View style={cartListStyle.foodIMGCircle}>
            <Image
              style={cartListStyle.foodImg}
              source={{
                // uri: "https://foodappcatarman.000webhostapp.com/images/images1.jpg",
                uri: `${webLink}/foodapp/images/${item.food_filename}`,
              }}
            />
          </View>
          <View style={cartListStyle.foodIMGLogoCircle}>
            <Image
              style={cartListStyle.foodImgLogo}
              source={{
                // uri: "https://foodappcatarman.000webhostapp.com/images/images1.jpg",
                uri: `${webLink}/foodapp/images/${item.est_file_name}`,
              }}
            />
          </View>
        </View>
        <View style={cartListStyle.foodDetailsContainer}>
          <View style={cartListStyle.foodNameContainer}>
            <Text style={cartListStyle.txtFoodName}>{item.food_name}</Text>
          </View>
          <View style={cartListStyle.foodQTYPriceContainer}>
            <Text style={cartListStyle.txtFoodPrice}>
              {item.food_price.trim()}
            </Text>
            <Text style={cartListStyle.txtFoodQTY}>{`x ${item.food_qty}`}</Text>
            <Text style={cartListStyle.txtFoodQTYPriceTotal}>
              {Number(Number(item.food_price) * Number(item.food_qty)).toFixed(
                2
              )}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  let refreshData = () => {
    getMyDetails();
    getMyCart();
  };
  let calculateTotal = () => {
    const listSelected = cartOne.filter((item) => {
      if (item.data.length > 0) {
        if (item.selected == true) {
          return item.data;
        }
      }
    });
    let foodContainer = [];
    const foodSelected = listSelected.filter((item) => {
      foodContainer = [];
      foodContainer = item.data;
    });
    foodContainer = foodContainer.filter((item) => item.selected == true);
    setFoodsToOrder(foodContainer);
    let total = 0;
    if (foodContainer.length > 0) {
      foodContainer.forEach((item) => {
        setCountSelectedFood(foodContainer.length);
        var getQTY = Number(item.food_qty);
        var getPrice = Number(item.food_price);
        total += getQTY * getPrice;
        setTotalFoodAmount(total.toFixed(2));
        total = total;
      });
      setBtnCartEnable(true);
    } else {
      setTotalFoodAmount(Number(0).toFixed(2));
      setBtnCartEnable(false);
      setCountSelectedFood(0);
    }
  };

  let PlaceOrder = async () => {
    try {
      console.log(foodsToOrder);
      var userid = userID;
      var getURL = `${webLink}/foodapp/backend/user.php`;
      var header = {
        Accept: "application/json",
      };
      var formDta = new FormData();
      formDta.append("PlaceOrder", "submit");
      formDta.append("userId", userid);
      formDta.append("orderGrandTotal", totalFoodAmount);
      formDta.append("deliveryFee", deliveryFee);
      formDta.append(
        "orderTotalPayment",
        (Number(totalFoodAmount) + Number(deliveryFee)).toFixed(2)
      );
      formDta.append("foodOrdered", JSON.stringify(foodsToOrder));
      console.log(formDta);
      await fetch(getURL, {
        method: "POST",
        mode: "cors",
        body: formDta,
        headers: header,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
          if (data.message == "Success") {
            setIsPopupError(false);
            setPopupMessage("Ordered Successfully!");
            setIsPopupVisible(true);
            hidePopUpMessage();
            setIsOrderDetailsModalHidden(false);
            setIsLoading(true);
          } else {
            setIsPopupError(true);
            setPopupMessage(data.message);
            setIsPopupVisible(true);
            hidePopUpMessage();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {}
  };
  let hidePopUpMessage = () => {
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 2500);
  };
  const display = btnCartEnable == true ? "flex" : "none";
  let onChangeCheckBoxValueHeader = (itemSelected, index) => {
    setTotalFoodAmount(Number(0).toFixed(2));
    const newData = cartOne.map((item) => {
      if (item.est_id == itemSelected.est_id) {
        return {
          ...item,
          selected: true,
        };
      }
      return {
        ...item,
        selected: !true,
      };
    });
    setCartOne(newData);
    calculateTotal();
  };
  let onChangeCheckBoxValueFood = (foodSelected, index) => {
    const newData = cartOne.map((item) => {
      let foods = [];
      let foodSel = [];
      if (item.selected == true) {
        foods = item.data;
        foodSel = foods.map((food) => {
          if (foodSelected.food_id == food.food_id) {
            return {
              ...food,
              selected: !food.selected,
            };
          }
          return {
            ...food,
          };
        });
        return {
          ...item,
          data: foodSel,
        };
      }
      return {
        ...item,
        selected: !true,
      };
    });
    setCartOne(newData);
    calculateTotal();
  };
  return (
    <View style={styles.CartMain}>
      {/* ////////////////////////////////////
            ORDER DETAILS MODAL FORM HERE
      /////////////////////*/}
      <Modal visible={isOrderDetailsModalHidden} animationType={"slide"}>
        <View style={ModalOrderDetails.MainModal}>
          <View style={ModalOrderDetails.TopModal}>
            <Icon
              onPress={() => {
                setIsOrderDetailsModalHidden(false);
                setIsCheck(false);
                setIsLoading(false);
              }}
              name="chevron-left"
              size={30}
              color={"black"}
              style={ModalOrderDetails.closeModal}
            />
            <Text style={ModalOrderDetails.txtTopTitle}>Order Details</Text>
          </View>
          <ScrollView
            style={{ width: "100%", flex: 1, backgroundColor: "white" }}
          >
            <View style={ModalOrderDetails.UserDetailsContainer}>
              <View style={ModalOrderDetails.UserDetailsMainContainer}>
                <Text style={ModalOrderDetails.txtUserDetailsTitle}>
                  CUSTOMER DETAILS
                </Text>
                <Text style={ModalOrderDetails.txtUserDetailsFullname}>
                  {fullname}
                </Text>
                <Text style={ModalOrderDetails.txtUserDetailsAddress}>
                  {address}{" "}
                </Text>
              </View>
            </View>
            <View style={ModalOrderDetails.DeliveryDetailsContainer}>
              <RiderCard
                imageSource={{
                  uri: `${webLink}/foodapp/images/delivery-man.png`,
                }}
              />
            </View>
            <Text style={ModalOrderDetails.txtUserOrderListTitle}>
              ORDER LIST
            </Text>
            <View style={ModalOrderDetails.OrderListContainer}>
              <View style={cartListStyle.cartListCont}>
                {isCheck == false ? (
                  <ActivityIndicator />
                ) : (
                  <View style={cartListStyle.cartItemContainer}>
                    <FlatList
                      numColumns={1}
                      style={cartListStyle.flatbudget}
                      data={foodsToOrder}
                      keyExtractor={(item) => item.food_id}
                      renderItem={renderSelectedFoods}
                    />
                  </View>
                )}
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: 10,
                  paddingLeft: 30,
                  paddingRight: 30,
                  justifyContent: "space-between",
                  backgroundColor: "#fafafa",
                }}
              >
                <Text style={{ textAlign: "left", fontWeight: "normal" }}>
                  Delivery fee
                </Text>
                <Text style={{ textAlign: "right", fontWeight: "bold" }}>
                  {deliveryFee}
                </Text>
              </View>
            </View>
          </ScrollView>

          <View style={ModalOrderDetails.PlaceOrderContainer}>
            <View style={ModalOrderDetails.PlaceOrderDetailsFinal}>
              <Text style={ModalOrderDetails.txtOrderTotalFoodAmountTitle}>
                Total item [ {countSelectedFood} ]
              </Text>
              <Text style={ModalOrderDetails.txtOrderTotalFoodAmountTitle}>
                Total payment
              </Text>
              <Text style={ModalOrderDetails.txtOrderTotalFoodAmount}>
                P{(Number(totalFoodAmount) + Number(deliveryFee)).toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity
              style={ModalOrderDetails.btnPlaceOrder}
              onPress={() => {
                PlaceOrder();
              }}
            >
              <Text style={carDetailsStyle.btnTxtCheckOut}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* ////////////////////////////////////
           ORDER DETAILS END OF MODAL FORM
      /////////////////////*/}
      <View style={styles.header}>
        <Icon
          name="shopping-cart"
          size={25}
          color={"#4f49d6"}
          style={{ color: "red" }}
        />
        <Text style={styles.txtheader}>CART</Text>
      </View>
      <ScrollView
        style={cartListStyle.cartList}
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={refreshData} />
        }
      >
        <View style={cartListStyle.cartListCont}>
          {isCartLoaded == false ? (
            <ActivityIndicator />
          ) : (
            cartOne.map((item, index) => {
              if (item.data.length > 0) {
                let foods = item.data;
                return (
                  <View key={index} style={cartSections.MainSection}>
                    <TouchableOpacity
                      style={cartSections.SectionHeader}
                      onPress={() => {
                        onChangeCheckBoxValueHeader(item, index);
                      }}
                    >
                      <CheckBox
                        center
                        style={cartSections.cbFood}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={item.selected}
                        disabled={false}
                        onIconPress={() => {
                          onChangeCheckBoxValueHeader(item, index);
                        }}
                      />
                      <View style={cartListStyle.foodIMGContainer}>
                        <View style={cartListStyle.foodIMGCircle}>
                          <Image
                            style={cartListStyle.foodImg}
                            source={{
                              // uri: "https://foodappcatarman.000webhostapp.com/images/images1.jpg",
                              uri: `${webLink}/foodapp/images/${item.est_file_name}`,
                            }}
                          />
                        </View>
                      </View>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 18,
                          color: "#702eb8",
                          marginLeft: 15,
                        }}
                      >
                        {item.est_name}
                      </Text>
                    </TouchableOpacity>
                    {foods.map((food, index) => {
                      return (
                        <TouchableOpacity
                          onIconPress={() => {
                            onChangeCheckBoxValueFood(food, index);
                          }}
                          style={
                            item.selected == true
                              ? cartListItemsStyle2.cartFood
                              : cartListItemsStyle2.cartFoodHidden
                          }
                        >
                          <View style={cartListItemsStyle.cbContainer}>
                            <CheckBox
                              center
                              style={cartListItemsStyle.cbFood}
                              checked={food.selected}
                              disabled={false}
                              onIconPress={() => {
                                onChangeCheckBoxValueFood(food, index);
                              }}
                            />
                          </View>
                          <View style={cartListItemsStyle.foodIMGContainer}>
                            <View style={cartListItemsStyle.foodIMGCircle}>
                              <Image
                                style={cartListItemsStyle.foodImg}
                                source={{
                                  // uri: "https://foodappcatarman.000webhostapp.com/images/images1.jpg",
                                  uri: `${webLink}/foodapp/images/${food.food_filename}`,
                                }}
                              />
                            </View>
                          </View>
                          <View style={cartListItemsStyle.foodDetailsContainer}>
                            <View style={cartListItemsStyle.foodNameContainer}>
                              <Text style={cartListItemsStyle.txtFoodName}>
                                {food.food_name}
                              </Text>
                            </View>
                            <View
                              style={cartListItemsStyle.foodQTYPriceContainer}
                            >
                              <Text style={cartListItemsStyle.txtFoodPrice}>
                                {food.food_price}
                              </Text>
                              <Text style={cartListItemsStyle.txtFoodQTY}>
                                {`x ${food.food_qty}`}
                              </Text>
                            </View>
                          </View>
                          <View style={cartListItemsStyle.controlContainer}>
                            {/* <TouchableOpacity
                              style={cartListItemsStyle.QTYControlPlus}
                            >
                              <Icon
                                style={cartListItemsStyle.qtyCtrl}
                                name="add"
                                size={17}
                                color={"black"}
                                style={{ color: "red" }}
                                onPress={() => {
                                  // setSelectedFoodID(food.food_id);
                                  // setUpdateQtyType("add");
                                }}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={cartListItemsStyle.QTYControlRemove}
                            >
                              <Icon
                                style={cartListItemsStyle.qtyCtrl}
                                name="remove"
                                size={17}
                                color={"black"}
                                style={{ color: "red" }}
                                onPress={() => {
                                  setSelectedFoodID(item.food_id);
                                  setUpdateQtyType("remove");
                                }}
                              />
                            </TouchableOpacity> */}
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                );
              }
            })
          )}
        </View>
      </ScrollView>
      <View style={carDetailsStyle.CartDetails}>
        <View style={carDetailsStyle.txtDeliveryFee}>
          <Text style={carDetailsStyle.txtDeliveryFeeTitle}>Total</Text>
          <Text style={carDetailsStyle.txtDeliveryFeeTitle}>
            (Note: This is not the total amount to pay)
          </Text>
          {/* <Text style={carDetailsStyle.txtDeliveryFeeAmount}>P50.00</Text> */}
        </View>
        <View style={carDetailsStyle.txtDeliveryFee}>
          <Text style={carDetailsStyle.txtDeliveryTotalFoodAmount}>
            P{totalFoodAmount}
          </Text>
          <TouchableOpacity
            style={[carDetailsStyle.btnCheckout, { display: display }]}
            onPress={() => {
              calculateTotal();
              setIsOrderDetailsModalHidden(true);
              setIsCheck(true);
            }}
          >
            <Text style={carDetailsStyle.btnTxtCheckOut}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
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
const cartListItemsStyle2 = StyleSheet.create({
  cartFood: {
    width: "100%",
    marginBottom: 0,
    height: "auto",
    borderWidth: 1,
    borderColor: "#f5f5f5",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderTopWidth: 0,
    display: "flex",
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    overflow: "hidden",
  },
  cartFoodHidden: {
    width: "100%",
    marginBottom: 0,
    height: 0,
    borderWidth: 1,
    borderColor: "#f5f5f5",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderTopWidth: 0,
    display: "flex",
    flexDirection: "row",
    // paddingTop: 15,
    // paddingBottom: 15,
    paddingLeft: 30,
    overflow: "hidden",
  },
});
const cartSections = StyleSheet.create({
  cbFood: {
    backgroundColor: "red",
    margin: 0,
    padding: 0,
  },
  SectionHeader: {
    height: "auto",
    width: "100%",
    backgroundColor: "white",
    padding: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#d6d6d6",
  },
  MainSection: {
    width: "100%",
    height: "auto",
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#d6d6d6",
  },
});
const ModalOrderDetails = StyleSheet.create({
  btnPlaceOrder: {
    padding: 8,
    paddingLeft: 15,
    borderRadius: 8,
    paddingRight: 15,
    backgroundColor: "#ed7f18",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  txtOrderTotalFoodAmountTitle: {
    fontSize: 15,
    color: "gray",
  },
  txtOrderTotalFoodAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  DeliveryDetailsContainer: {
    width: "100%",
    height: "auto",
    padding: 10,
  },
  PlaceOrderContainer: {
    padding: 10,
    width: "100%",
    height: 100,
    // backgroundColor: "#2c6dde",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#f7f7f7",
  },
  OrderListContainer: {
    width: "100%",
    height: "auto",
    backgroundColor: "white",
  },
  txtUserOrderListTitle: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    borderBottomWidth: 1,
    color: "#4572ba",
    borderBottomColor: "#f0f0f0",
  },
  txtUserDetailsAddress: {
    fontSize: 14,
    fontWeight: "normal",
    paddingBottom: 5,
    borderBottomWidth: 1,
    color: "#969696",
    borderBottomColor: "#f0f0f0",
  },
  txtUserDetailsFullname: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 5,
    borderBottomWidth: 1,
    color: "black",
    borderBottomColor: "#f0f0f0",
  },
  txtUserDetailsTitle: {
    fontSize: 13,
    fontWeight: "bold",
    paddingBottom: 5,
    borderBottomWidth: 1,
    color: "#4572ba",
    borderBottomColor: "#f0f0f0",
  },
  UserDetailsMainContainer: {
    padding: 5,
    borderRadius: 2,
    backgroundColor: "#f5f5f5",
    height: "auto",
    width: "100%",
    borderColor: "#f0f0f0",
    borderWidth: 1,
  },
  UserDetailsContainer: {
    width: "100%",
    height: "auto",
    padding: 10,
  },
  txtTopTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeModal: {
    position: "relative",

    borderRadius: 5,
    backgroundColor: "green",
    height: "auto",
    width: "auto",
  },
  TopModal: {
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 7,
    justifyContent: "flex-start",
  },
  MainModal: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
  },
});
const carDetailsStyle = StyleSheet.create({
  btnCheckout: {
    padding: 8,
    paddingLeft: 15,
    borderRadius: 8,
    paddingRight: 15,
    backgroundColor: "#ed7f18",
  },
  btnTxtCheckOut: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  txtDeliveryTotalFoodAmount: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#eb4034",
  },
  txtDeliveryFeeAmount: {
    fontSize: 13,
    fontWeight: "bold",
    color: "black",
  },
  txtDeliveryFeeTitle: {
    fontSize: 13,
    color: "gray",
  },
  txtDeliveryFee: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  CartDetails: {
    width: "100%",
    height: 90,
    padding: 10,
    // backgroundColor: "#f0f5ff",
    backgroundColor: "white",
    borderTopColor: "#b2c0db",
    borderTopWidth: 1,
  },
});
const cartListItemsStyle = StyleSheet.create({
  qtyCtrl: {},
  QTYControlPlus: {
    paddingRight: 4,
    paddingLeft: 4,
    paddingTop: 4,
    paddingBottom: 4,
    borderColor: "#c7c7c7",
    borderWidth: 1,
    marginRight: 20,
    borderRadius: 15,
    marginBottom: 6,
    alignSelf: "center",
  },
  QTYControlRemove: {
    paddingRight: 4,
    paddingLeft: 4,
    paddingTop: 4,
    paddingBottom: 4,
    borderColor: "#c7c7c7",
    borderWidth: 1,
    marginRight: 20,
    borderRadius: 15,
    alignSelf: "center",
  },
  controlContainer: {
    flexBasis: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10,
    backgroundColor: "white",
  },
  txtFoodQTYPriceTotal: {
    fontSize: 15,
    color: "#b5b3b3",
    fontWeight: "bold",
    marginLeft: 60,
  },
  txtFoodQTY: {
    fontSize: 14,
    color: "#c2c2c2",
  },
  txtFoodPrice: {
    width: 120,
    fontSize: 14,
    color: "#7035a1",
    fontWeight: "bold",
  },
  txtFoodName: {
    width: "100%",
    height: "auto",
    fontSize: 15,
    fontWeight: "400",
    color: "black",
  },
  foodQTYPriceContainer: {
    display: "flex",
    flexDirection: "row",
  },
  foodNameContainer: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  foodDetailsContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    paddingLeft: 5,
    paddingRight: 5,
    width: "55%",
    height: "auto",
    backgroundColor: "white",
  },
  foodImg: {
    position: "relative",
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
    // alignSelf: "center",
  },
  foodImgLogo: {
    position: "relative",
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
    // alignSelf: "center",
  },
  foodIMGCircle: {
    position: "relative",
    height: 50,
    width: 50,
    overflow: "hidden",
    borderRadius: 25,
  },
  foodIMGLogoCircle: {
    position: "absolute",
    bottom: 4,
    right: 4,
    height: 24,
    width: 24,
    padding: 2,
    borderRadius: 12,
  },
  foodIMGContainer: {
    display: "flex",
    flexBasis: 60,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cbFood: {
    margin: 0,
    padding: 0,
  },
  cbContainer: {
    paddingLeft: 5,
    flexBasis: 35,

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    width: "100%",
  },
  cartFoodWithBttomSep: {
    width: "100%",
    marginBottom: 0,
    height: "auto",
    borderWidth: 1,
    borderColor: "#f5f5f5",
    backgroundColor: "white",
    borderBottomWidth: 0,
    borderTopWidth: 0,
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    marginBottom: 40,
  },
  cartFood: {
    width: "100%",
    marginBottom: 0,
    height: "auto",
    borderWidth: 1,
    borderColor: "#f5f5f5",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderTopWidth: 0,
    display: "flex",
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
  },
  cartItemContainer: {
    width: "100%",
    height: "auto",
  },
  cartListCont: {
    width: "100%",
    height: "auto",
  },
  cartList: {
    padding: 0,
    width: "100%",
    flex: 1,
    backgroundColor: "white",
  },
});
const cartListStyle = StyleSheet.create({
  qtyCtrl: {},
  QTYControlPlus: {
    paddingRight: 4,
    paddingLeft: 4,
    paddingTop: 4,
    paddingBottom: 4,
    borderColor: "#c7c7c7",
    borderWidth: 1,
    marginLeft: 10,
    borderRadius: 15,
    marginBottom: 6,
  },
  QTYControlRemove: {
    paddingRight: 4,
    paddingLeft: 4,
    paddingTop: 4,
    paddingBottom: 4,
    borderColor: "#c7c7c7",
    borderWidth: 1,
    marginLeft: 10,
    borderRadius: 15,
  },
  controlContainer: {
    flexBasis: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  txtFoodQTYPriceTotal: {
    fontSize: 15,
    color: "#b5b3b3",
    fontWeight: "bold",
    marginLeft: 60,
  },
  txtFoodQTY: {
    fontSize: 14,
    color: "#c2c2c2",
  },
  txtFoodPrice: {
    width: 120,
    fontSize: 14,
    color: "#7035a1",
    fontWeight: "bold",
  },
  txtFoodName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
  },
  foodQTYPriceContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  foodNameContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    // paddingLeft: 15,
  },
  foodDetailsContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    paddingLeft: 15,
    paddingRight: 5,
  },
  foodImg: {
    position: "relative",
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
    // alignSelf: "center",
  },
  foodImgLogo: {
    position: "relative",
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
    // alignSelf: "center",
  },
  foodIMGCircle: {
    position: "relative",
    height: 40,
    width: 40,
    overflow: "hidden",
    borderRadius: 25,
  },
  foodIMGLogoCircle: {
    position: "absolute",
    bottom: 4,
    right: 4,
    height: 24,
    width: 24,
    padding: 2,
    borderRadius: 12,
  },
  foodIMGContainer: {
    display: "flex",
    flexBasis: "auto",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "transparent",
  },
  cbFood: {
    margin: 0,
    padding: 0,
  },
  cbContainer: {
    paddingLeft: 5,
    flexBasis: 35,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    width: "100%",
  },
  cartFood: {
    width: "100%",
    marginBottom: 0,
    height: "auto",
    borderWidth: 1,
    borderColor: "#f5f5f5",
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  cartItemContainer: {
    width: "100%",
    height: "auto",
  },
  cartListCont: {
    width: "100%",
    height: "auto",
    backgroundColor: "white",
    paddingBottom: 5,
  },
  cartList: {
    padding: 10,
    width: "100%",
    flex: 1,
    backgroundColor: "white",
  },
});
const styles = StyleSheet.create({
  CartMain: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  header: {
    padding: 10,
    width: "100%",
    paddingTop: 50,
    paddingLeft: 10,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  txtheader: {
    fontWeight: "bold",
    color: "#4f49d6",
    marginLeft: 10,
  },
  cartList: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  cartListCont: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopWidth: 1,
    borderTopColor: "#f5f5f5",
  },
});

export default Cart;
