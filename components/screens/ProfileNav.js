import React, { useState, useEffect } from "react";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import {
  createStackNavigation,
  createStackNavigator,
} from "react-navigation-stack";
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
  RefreshControl,
  UselessTextInput,
} from "react-native";
import global from "./global";
import {
  Icon,
  Overlay,
  Tab,
  TabView,
  Button,
  Rating,
  RatingProps,
} from "react-native-elements";
import Profile from "./Profile";
// import Profile from "./HomeComponents/OrderItem";
import OrderList from "./HomeComponents/OrderItem";
const ProfileNav = ({ navigation }) => {
  const [ip, setIp] = useState(global.ip);
  const [userID, SetUserID] = useState(global.userID);
  const [selectedOrderID, setSelectedOrderID] = useState("");
  const [index, setIndex] = React.useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isOrderSelected, setIsOrderSelected] = useState(false);
  let [fullname, setFullname] = useState("");
  const [webLink, setWebLink] = useState(
    "https://foodappcatarman.000webhostapp.com"
  );
  let [address, setAddress] = useState("");
  let [newOrders, setNewOrders] = useState([]);
  let [cancelOrders, setCancelOrders] = useState([]);
  let [onDeliveryOrders, setOnDeliveryOrders] = useState([]);
  let [completedOrders, setCompletedOrders] = useState([]);
  let [orderItems, setOrderItems] = useState([]);
  let [orderDetails, setOrderDetails] = useState([]);
  let [userDetails, setUserDetails] = useState([]);
  let [orderStatusMain, setOrderStatusMain] = useState("");
  let [orderStatusSub, setOrderStatusSub] = useState("");
  let [estImage, setEstImage] = useState("");
  let [rejectReason, setRejectReason] = useState("");
  const [isOverlayRejestVisible, setIsOverlayRejestVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isRatingFormVisible, setIsRatingFormVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isPopupError, setIsPopupError] = useState(false);
  const [orderRating, setOrderRating] = useState(1);
  const [comment, setComment] = useState("");
  const [mainStatus, setMainStatus] = useState("");
  const [isRefresh, setIsRefresh] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

    getMyDetails();
    getMyNewOrders();
    getMyOnDeliveryOrders();
    getMyCompletedOrders();
    getMyCancelledOrders();
    if (showModal == true) {
      getData();
    }
  }, [showModal]);
  // useEffect(() => {
  //   LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  //   if (showModal == true) {
  //     getData();
  //   }
  // }, [showModal]);
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    if (count <= 4) {
      setSelectedOrderID(selectedOrderID);
      getOrderDetails();
      getOrderStatusText();
      getOrderItems();
      getUserDetails();
      getOrderStatusText();
    }
  }, [selectedOrderID, orderDetails]);
  const getMyOnDeliveryOrders = async () => {
    // var getURL = "https://foodappcatarman.000webhostapp.com/food.php";
    var getURL = `${webLink}/foodapp/backend/user.php`;
    var header = {
      Accept: "application/json",
    };
    var formDta = new FormData();
    formDta.append("getMyOnDeliveryOrders", "submit");
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
          setOnDeliveryOrders(data);
        } else {
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  const getMyCancelledOrders = async () => {
    // var getURL = "https://foodappcatarman.000webhostapp.com/food.php";
    var getURL = `${webLink}/foodapp/backend/user.php`;
    var header = {
      Accept: "application/json",
    };
    var formDta = new FormData();
    formDta.append("getMyCancelledOrders", "submit");
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
          setCancelOrders(data);
        } else {
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  const getMyCompletedOrders = async () => {
    // var getURL = "https://foodappcatarman.000webhostapp.com/food.php";
    var getURL = `${webLink}/foodapp/backend/user.php`;
    var header = {
      Accept: "application/json",
    };
    var formDta = new FormData();
    formDta.append("getMyCompletedOrders", "submit");
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
          setCompletedOrders(data);
        } else {
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  const getMyNewOrders = async () => {
    // var getURL = "https://foodappcatarman.000webhostapp.com/food.php";
    var getURL = `${webLink}/foodapp/backend/user.php`;
    var header = {
      Accept: "application/json",
    };
    var formDta = new FormData();
    formDta.append("getMyNewOrders", "submit");
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
          setNewOrders(data);
        } else {
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
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
          setIsLoading(true);
        } else {
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  let renderNewOrders = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        setShowModal(true);
        setIsOrderSelected(true);
        setSelectedOrderID(item.order_id);
        getOrderDetails();
        getOrderStatusText();
        getOrderItems();
        getUserDetails();
        setCount(0);
        setEstImage(`${webLink}/foodapp/images/${item.est_file_name}`);
      }}
      style={{ width: "100%" }}
    >
      <OrderList
        ImageSource={{
          uri: `${webLink}/foodapp/images/${item.est_file_name}`,
        }}
        orderID={item.order_id}
        Items={item.food_name}
        total={item.total_amount}
      />
    </TouchableOpacity>
  );
  const getOrderItems = async () => {
    // var getURL = "https://foodappcatarman.000webhostapp.com/food.php";
    var getURL = `${webLink}/foodapp/backend/user.php`;
    var header = {
      Accept: "application/json",
    };
    var formDta = new FormData();
    formDta.append("getOrderItems", "submit");
    formDta.append("orderID", selectedOrderID);
    await fetch(getURL, {
      method: "POST",
      mode: "cors",
      body: formDta,
      headers: header,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setOrderItems(data);
          // setIsOrderSelected(true);
        } else {
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  const getOrderDetails = async () => {
    // var getURL = "https://foodappcatarman.000webhostapp.com/food.php";
    var getURL = `${webLink}/foodapp/backend/user.php`;
    var header = {
      Accept: "application/json",
    };
    var formDta = new FormData();
    formDta.append("getOrderDetails", "submit");
    formDta.append("orderID", selectedOrderID);
    await fetch(getURL, {
      method: "POST",
      mode: "cors",
      body: formDta,
      headers: header,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setOrderDetails(data);
          let status =
            orderDetails.length > 0 ? orderDetails[0]["order_status"] : "";
          setMainStatus(status);
          setCount((prev) => prev + 1);
        } else {
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  const getUserDetails = async () => {
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
          setUserDetails(data);
          // setIsOrderSelected(true);
          // alert(orderDetails[0]["order_status"]);
        } else {
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  const getOrderStatusText = () => {
    setOrderStatusMain(() => {
      if (mainStatus == "ACTIVE") {
        return "PROCESSING ORDER";
      } else if (mainStatus == "ONDELIVERY") {
        return "ON DELIVERY";
      } else if (mainStatus == "DELIVERED") {
        return "ORDER DELIVERED";
      } else if (mainStatus == "COMPLETED") {
        return "ORDER COMPLETED";
      } else if (mainStatus == "CANCELLED") {
        return "ORDER CANCELLED";
      }
    });
    setOrderStatusSub(() => {
      if (mainStatus == "ACTIVE") {
        return "Your order is being verified.";
      } else if (mainStatus == "ONDELIVERY") {
        return "Rider is on the way to deliver your order.";
      } else if (mainStatus == "DELIVERED") {
        return "Your order has been delivered. Please leave a rating.";
      } else if (mainStatus == "COMPLETED") {
        return "Transaction complete";
      } else if (mainStatus == "CANCELLED") {
        return "Order has been cancelled.";
      }
    });
    // if (status == "ACTIVE") {
    //   setOrderStatusMain("PROCESSING ORDER");
    //   setOrderStatusSub("Your order is being verified.");
    // } else if (status == "ONDELIVERY") {
    //   setOrderStatusMain("ON DELIVERY");
    //   setOrderStatusSub("Rider is on the way to deliver your order.");
    // } else if (status == "DELIVERED") {
    //   setOrderStatusMain("ORDER DELIVERED");
    //   setOrderStatusSub(
    //     "Your order has been delivered. Please leave a rating."
    //   );
    // } else if (status == "COMPLETED") {
    //   setOrderStatusMain("ORDER COMPLETED");
    //   setOrderStatusSub("Transaction complete");
    // } else if (status == "CANCELLED") {
    //   setOrderStatusMain("ORDER CANCELLED");
    //   setOrderStatusSub("Order has been cancelled.");
    // }
  };
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
        </View>
        <View style={cartListStyle.foodDetailsContainer}>
          <View style={cartListStyle.foodNameContainer}>
            <Text style={cartListStyle.txtFoodName}>{item.food_name}</Text>
          </View>
          <View style={cartListStyle.foodQTYPriceContainer}>
            <Text style={cartListStyle.txtFoodPrice}>{item.food_price}</Text>
            <Text style={cartListStyle.txtFoodQTY}>{`x ${item.qty}`}</Text>
            <Text style={cartListStyle.txtFoodQTYPriceTotal}>
              {Number(Number(item.food_price) * Number(item.qty)).toFixed(2)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  function convertEmoji(str) {
    return str.replace(/\[e-([0-9a-fA-F]+)\]/g, (match, hex) =>
      String.fromCodePoint(Number.parseInt(hex, 16))
    );
  }
  let cancelOrder = async () => {
    let reason = rejectReason;
    let orderID = selectedOrderID;
    if (reason == "") {
      setIsPopupError(true);
      setPopupMessage("Please leave a reason for cancellation.");
      setIsPopupVisible(true);
      hidePopUpMessage();
    } else {
      const str = reason;
      const rex =
        /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu;
      const updated = str.replace(
        rex,
        (match) => `[e-${match.codePointAt(0).toString(16)}]`
      );
      var getURL = `${webLink}/foodapp/backend/user.php`;
      var header = {
        Accept: "application/json",
      };
      var formDta = new FormData();
      formDta.append("cancelOrder", "submit");
      formDta.append("orderID", orderID);
      formDta.append("reason", updated);
      await fetch(getURL, {
        method: "POST",
        mode: "cors",
        body: formDta,
        headers: header,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message == "Success") {
            setIsOverlayRejestVisible(false);
            setIsPopupError(false);
            setPopupMessage("Order Cancelled Successfully!");
            setIsPopupVisible(true);
            hidePopUpMessage();
            setShowModal(false);
            refreshData();
          } else {
            setIsOverlayRejestVisible(true);
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
  function unicodeToChar(text) {
    return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
      return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16));
    });
  }
  let completeOrder = async () => {
    if (comment == "") {
      setIsPopupError(true);
      setPopupMessage("Please leave a comment");
      setIsPopupVisible(true);
      hidePopUpMessage();
    } else {
      const str = comment;
      const rex =
        /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu;
      const updated = str.replace(
        rex,
        (match) => `[e-${match.codePointAt(0).toString(16)}]`
      );
      var getURL = `${webLink}/foodapp/backend/user.php`;
      var header = {
        Accept: "application/json",
      };
      var formDta = new FormData();
      formDta.append("completeOrder", "submit");
      formDta.append("orderID", selectedOrderID);
      formDta.append("comment", updated);
      formDta.append("starNum", orderRating);
      await fetch(getURL, {
        method: "POST",
        mode: "cors",
        body: formDta,
        headers: header,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message == "Success") {
            setIsRatingFormVisible(false);
            setIsPopupError(false);
            setPopupMessage("Ordered Successfully!");
            setIsPopupVisible(true);
            hidePopUpMessage();
            setShowModal(false);
            refreshData();
          } else {
            setIsRatingFormVisible(true);
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
  const ratingCompleted = (rating) => {
    setOrderRating(rating);
  };
  let refreshData = () => {
    setNewOrders([]);
    setOnDeliveryOrders([]);
    setCompletedOrders([]);
    setCancelOrders([]);
    getMyDetails();
    getMyNewOrders();
    getMyOnDeliveryOrders();
    getMyCompletedOrders();
    getMyCancelledOrders();
    setIsOrderSelected(false);
    setShowModal(false);
    setOrderDetails([]);
    setOrderItems([]);
    setOrderStatusMain("");
    setOrderStatusSub("");
  };
  let getData = (orderID) => {
    // getOrderDetails(orderID);
    // getOrderItems(orderID);
    // getUserDetails();
    // setShowModal(true);
    // setIsOrderSelected(true);
  };
  return (
    <KeyboardAvoidingView style={profileStyle.ProfileMain}>
      <ScrollView
        style={profileStyle.profileScroller}
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={refreshData} />
        }
      >
        <View style={profileStyle.HeaderProfile}>
          <Text style={profileStyle.txtProfile}>My Information</Text>
          <Text style={profileStyle.txtProfileName}>{fullname}</Text>
          <Text style={profileStyle.txtProfileAddress}>{address}</Text>
          <View style={profileStyle.btnEditProfileContainer}>
            <TouchableOpacity
              style={profileStyle.btnEditProfile}
              onPress={() => {
                navigation.navigate("Profile", { user_ID: userID });
              }}
            >
              <Text style={profileStyle.txtEditProfile}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={profileStyle.MyOrderSection}>
          <Text style={profileStyle.txtOrderHeaderTitle}>My Orders</Text>

          <View style={profileStyle.OrderTabContainer}>
            <Tab
              value={index}
              onChange={(e) => setIndex(e)}
              indicatorStyle={{
                backgroundColor: "white",
                height: 3,
              }}
              variant="primary"
            >
              <Tab.Item
                onPress={() => {
                  alert("new");
                }}
                title="New"
                titleStyle={{ fontSize: 8 }}
                icon={{ name: "timer", type: "ionicon", color: "white" }}
              />
              <Tab.Item
                title="On Delivery"
                titleStyle={{ fontSize: 8 }}
                icon={{
                  name: "local-shipping",
                  type: "material",
                  color: "white",
                }}
              />
              <Tab.Item
                title="Completed"
                titleStyle={{ fontSize: 8 }}
                icon={{
                  name: "checkmark-circle",
                  type: "ionicon",
                  color: "white",
                }}
              />
              <Tab.Item
                title="Cancelled"
                titleStyle={{ fontSize: 8 }}
                icon={{
                  name: "pricetags-sharp",
                  type: "ionicon",
                  color: "white",
                }}
              />
            </Tab>

            <TabView value={index} onChange={setIndex} animationType="spring">
              <TabView.Item
                style={{ backgroundColor: "#fafafa", width: "100%" }}
              >
                {isLoading == false ? (
                  <ActivityIndicator />
                ) : (
                  <View style={profileStyle.ListCont}>
                    <FlatList
                      scrollEnabled={false}
                      numColumns={1}
                      data={newOrders}
                      keyExtractor={(item) => item.order_id}
                      renderItem={renderNewOrders}
                    />
                  </View>
                )}
              </TabView.Item>
              <TabView.Item
                style={{ backgroundColor: "#fafafa", width: "100%" }}
              >
                {isLoading == false ? (
                  <ActivityIndicator />
                ) : (
                  <View style={profileStyle.ListCont}>
                    <FlatList
                      scrollEnabled={false}
                      numColumns={1}
                      data={onDeliveryOrders}
                      keyExtractor={(item) => item.order_id}
                      renderItem={renderNewOrders}
                    />
                  </View>
                )}
              </TabView.Item>
              <TabView.Item
                style={{ backgroundColor: "#fafafa", width: "100%" }}
              >
                {isLoading == false ? (
                  <ActivityIndicator />
                ) : (
                  <View style={profileStyle.ListCont}>
                    <FlatList
                      scrollEnabled={false}
                      numColumns={1}
                      data={completedOrders}
                      keyExtractor={(item) => item.order_id}
                      renderItem={renderNewOrders}
                    />
                  </View>
                )}
              </TabView.Item>
              <TabView.Item
                style={{ backgroundColor: "#fafafa", width: "100%" }}
              >
                {isLoading == false ? (
                  <ActivityIndicator />
                ) : (
                  <View style={profileStyle.ListCont}>
                    <FlatList
                      scrollEnabled={false}
                      numColumns={1}
                      data={cancelOrders}
                      keyExtractor={(item) => item.order_id}
                      renderItem={renderNewOrders}
                    />
                  </View>
                )}
              </TabView.Item>
            </TabView>
          </View>
        </View>
      </ScrollView>
      {/* ////////////////////////////////////
            ORDER DETAILS MODAL FORM HERE
      /////////////////////*/}
      <Modal visible={showModal} animationType={"slide"}>
        <View style={ModalOrderDetails.MainModal}>
          <View style={ModalOrderDetails.TopModal}>
            <Icon
              onPress={() => {
                getOrderDetails("");
                getOrderItems("");
                getUserDetails();
                setSelectedOrderID("");
                setShowModal(false);
              }}
              name="chevron-left"
              size={30}
              color={"white"}
              style={ModalOrderDetails.closeModal}
            />
            <Text style={ModalOrderDetails.txtTopTitle}>Order Details</Text>
          </View>
          <ScrollView
            style={{ width: "100%", flex: 1, backgroundColor: "white" }}
          >
            <View style={ModalOrderDetails.orderDetailsMainContainer}>
              <View style={ModalOrderDetails.orderDetailsTopHeader}>
                <Text style={ModalOrderDetails.txtTopTitleHeader}>
                  {orderDetails.length > 0 ? orderStatusMain : ""}
                </Text>
              </View>
              <View style={ModalOrderDetails.orderDetailsTopHeaderSub}>
                <Text style={ModalOrderDetails.txtTopTitleHeaderSub}>
                  {orderDetails.length > 0 ? orderStatusSub : ""}
                </Text>
              </View>
              <View
                style={
                  (RiderModalOrderDetails.ViewMain,
                  {
                    display:
                      orderDetails.length > 0
                        ? orderDetails[0]["order_status"] == "ACTIVE" ||
                          orderDetails[0]["order_status"] == "CANCELLED"
                          ? "none"
                          : "flex"
                        : "none",
                    flexDirection: "row",
                    padding: 10,
                    paddingTop: 20,
                    paddingBottom: 20,
                  })
                }
              >
                <View style={RiderModalOrderDetails.RiderIcon}>
                  <View style={RiderModalOrderDetails.RiderIconContainer}>
                    <Image
                      style={RiderModalOrderDetails.riderimg}
                      source={require("../images/delivery-man.png")}
                    />
                  </View>
                  <Text>Rider</Text>
                </View>
                <View style={RiderModalOrderDetails.paymentA}>
                  <Text style={RiderModalOrderDetails.txtRiderName}>
                    {orderDetails.length > 0 ? orderDetails[0]["fullname"] : ""}
                  </Text>
                  <Text style={RiderModalOrderDetails.txtRiderNumber}>
                    {orderDetails.length > 0 ? orderDetails[0]["contact"] : ""}
                  </Text>
                </View>
              </View>
              <View style={cartListStyle.OrderNumber}>
                <Text style={cartListStyle.lblOrderNumber}>Order Number</Text>
                <Text style={cartListStyle.lblOrderNumberValue}>
                  {selectedOrderID}
                </Text>
              </View>
              <View style={cartListStyle.subContent}>
                <Text style={cartListStyle.subContenText}>
                  Food ordered from
                </Text>
                <View style={cartListStyle.subContentEstImage}>
                  <Image
                    style={{
                      flex: 1,
                      width: null,
                      height: null,
                      resizeMode: "contain",
                    }}
                    source={{
                      uri: estImage,
                    }}
                  />
                </View>
                {/* <Text style={cartListStyle.subContenTextEstName}>JOLLIBEE</Text> */}
                <Text style={cartListStyle.subContenTextEsAddress}>{}</Text>
              </View>
              <View style={orderDetailsModalList.ModalMainList}>
                {isLoading == false ? (
                  <ActivityIndicator />
                ) : (
                  <View style={cartListStyle.cartItemContainer}>
                    {
                      <FlatList
                        scrollEnabled={false}
                        numColumns={1}
                        style={cartListStyle.flatbudget}
                        data={orderItems}
                        keyExtractor={(item) => item.id}
                        renderItem={renderSelectedFoods}
                        // refreshing={refresh}
                      />
                    }
                  </View>
                )}
              </View>
              {/* ============================================================== */}
              {/* ============================================================== */}
              {/* PAYMENT DETAILS */}
              <View style={cartListStyle.subPaymentDetails}>
                <Text style={cartListStyle.lblOrderNumber}>Total amount</Text>
                <Text style={cartListStyle.lblOrderNumberValue}>
                  {orderDetails.length > 0
                    ? orderDetails[0]["total_amount"]
                    : "0.00"}
                </Text>
              </View>
              <View style={cartListStyle.subPaymentDetails}>
                <Text style={cartListStyle.lblOrderNumber}>
                  Delivery charge
                </Text>
                <Text style={cartListStyle.lblOrderNumberValue}>
                  {orderDetails.length > 0
                    ? orderDetails[0]["add_payment"]
                    : "0.00"}
                </Text>
              </View>
              <View style={cartListStyle.OrderNumber2}>
                <Text style={cartListStyle.lblOrderNumber}>Total payment</Text>
                <Text style={cartListStyle.lblOrderNumberValue}>
                  {orderDetails.length > 0
                    ? orderDetails[0]["grand_amount"]
                    : "0.00"}
                </Text>
              </View>
              {/* ============================================================== */}
              {/* ============================================================== */}
              <View
                style={{
                  display:
                    orderDetails.length > 0
                      ? orderDetails[0]["order_status"] == "CANCELLED"
                        ? "flex"
                        : "none"
                      : "none",
                  width: "100%",
                  height: "auto",
                  padding: 10,
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "white",
                  paddingLeft: 30,
                  paddingRight: 30,
                  marginTop: 0,
                  marginBottom: 40,
                }}
              >
                <Text
                  style={{
                    width: "100%",
                    height: "auto",
                    backgroundColor: "#ffd4d4",
                    borderWidth: 1,
                    borderColor: "#ffb3b3",
                    padding: 20,
                    marginBottom: 20,
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Order Cancelled
                </Text>
                <Text
                  style={{
                    width: "100%",
                    height: "auto",
                    backgroundColor: "white",
                    padding: 5,
                    textAlign: "left",
                    marginBottom: 5,
                  }}
                >
                  Reason:
                </Text>
                <Text
                  style={{
                    width: "100%",
                    height: "auto",
                    backgroundColor: "#f5f5f5",
                    borderWidth: 1,
                    borderColor: "#ebebeb",
                    padding: 15,
                    textAlign: "left",
                    marginBottom: 5,
                    borderRadius: 2,
                    fontSize: 14,
                    fontWeight: "normal",
                  }}
                >
                  {orderDetails.length > 0
                    ? convertEmoji(orderDetails[0]["reject_reason"])
                    : ""}
                </Text>
              </View>
              <View
                style={
                  (cartListStyle.dateTimeDelivered,
                  {
                    display:
                      orderDetails.length > 0
                        ? orderDetails[0]["order_status"] != "COMPLETED"
                          ? "none"
                          : "flex"
                        : "none",
                    width: "100%",
                    height: "auto",
                    padding: 10,
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backgroundColor: "white",
                    paddingLeft: 30,
                    paddingRight: 30,
                    marginTop: 0,
                    marginBottom: 40,
                  })
                }
              >
                <Text style={cartListStyle.lblOrderNumber}>
                  Date and Time delivered
                </Text>
                <Text style={cartListStyle.lblOrderNumberValue}>
                  {orderDetails.length > 0
                    ? orderDetails[0]["dateTime_delivered"]
                    : ""}
                </Text>
              </View>
              <View
                style={
                  (cartListStyle.btnCancelContainer,
                  {
                    display:
                      orderDetails.length > 0
                        ? orderDetails[0]["order_status"] != "ACTIVE"
                          ? "none"
                          : "flex"
                        : "none",
                    flexDirection: "row",
                    width: "100%",
                    height: "auto",
                    padding: 30,
                    backgroundColor: "white",
                  })
                }
              >
                <TouchableOpacity
                  style={cartListStyle.btnCancel}
                  onPress={() => {
                    setIsOverlayRejestVisible(true);
                  }}
                >
                  <Text style={cartListStyle.lblBtnCancel}>Cancel Order</Text>
                </TouchableOpacity>
              </View>
              <View
                style={
                  (cartListStyle.btnCancelContainer,
                  {
                    display:
                      orderDetails.length > 0
                        ? orderDetails[0]["order_status"] == "DELIVERED"
                          ? "flex"
                          : "none"
                        : "none",
                    flexDirection: "row",
                    width: "100%",
                    height: "auto",
                    padding: 30,
                    backgroundColor: "white",
                  })
                }
              >
                <TouchableOpacity
                  style={cartListStyle.btnCancel}
                  onPress={() => {
                    setIsRatingFormVisible(true);
                  }}
                >
                  <Text style={cartListStyle.lblBtnCancel}>Order Received</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      {/* ////////////////////////////////////
           ORDER DETAILS END OF MODAL FORM
      /////////////////////*/}
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
        <View style={overlaySuccessStyle.Container}>
          {isPopupError == true ? (
            <Icon
              style={overlaySuccessStyle.successIcon}
              name="error"
              size={85}
              type="material"
              color=""
              color="#de4028"
            />
          ) : (
            <Icon
              style={overlaySuccessStyle.successIcon}
              name="checkmark-circle"
              size={85}
              type="ionicon"
              color="#2cc7ba"
            />
          )}

          <Text style={overlaySuccessStyle.txtOverlay}>{popupMessage}</Text>
        </View>
      </Overlay>

      <Overlay
        // isVisible={true}
        isVisible={isOverlayRejestVisible}
        windowBackgroundColor="rgba(255, 255, 255, .5)"
        overlayBackgroundColor="red"
        width="100"
        height="auto"
        borderRadius={100}
        // onBackdropPress={toggleOverlay}
      >
        <View style={overlayRejectStyle.Container}>
          <Text style={overlayRejectStyle.txtOverlay}>
            Are you sure you want to cancel this order?
          </Text>
          <Text style={overlayRejectStyle.txtOverlaySub}>
            Please leave a reason of cancellation
          </Text>
          <TextInput
            style={overlayRejectStyle.txtCancellation}
            onChangeText={(val) => setRejectReason(val)}
          />
          <View style={overlayRejectStyle.btnContainer}>
            <Button
              title="Close"
              buttonStyle={{
                backgroundColor: "#f2f2f2",
                borderRadius: 3,
                color: "black",
              }}
              containerStyle={{
                color: "black",
                width: 100,
              }}
              titleStyle={{ color: "black" }}
              onPress={() => {
                setIsOverlayRejestVisible(false);
              }}
            />
            <Button
              title="Send"
              buttonStyle={{
                backgroundColor: "rgba(78, 116, 289, 1)",
                borderRadius: 3,
              }}
              containerStyle={{
                width: 100,
              }}
              onPress={() => {
                cancelOrder();
              }}
            />
          </View>
        </View>
      </Overlay>
      <Overlay
        // isVisible={true}
        isVisible={isRatingFormVisible}
        windowBackgroundColor="rgba(255, 255, 255, .5)"
        overlayBackgroundColor="red"
        width="100"
        height="auto"
        borderRadius={100}
        // onBackdropPress={toggleOverlay}
      >
        <View style={overlayRejectStyle.Container}>
          <Text style={overlayRejectStyle.txtOverlay}>
            Tell us about your order experience!
          </Text>
          <Text style={overlayRejectStyle.txtOverlaySub}>
            Please leave a rating and comment
          </Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 0,
            }}
          >
            <Rating
              showRating
              startingValue={1}
              imageSize={40}
              onFinishRating={ratingCompleted}
              style={{ paddingVertical: 10 }}
            />
          </View>
          <TextInput
            style={overlayRejectStyle.txtCancellation}
            onChangeText={(val) => setComment(val)}
          />
          <View style={overlayRejectStyle.btnContainer}>
            <Button
              title="Close"
              buttonStyle={{
                backgroundColor: "#f2f2f2",
                borderRadius: 3,
                color: "black",
              }}
              containerStyle={{
                color: "black",
                width: 100,
              }}
              titleStyle={{ color: "black" }}
              onPress={() => {
                setIsRatingFormVisible(false);
              }}
            />
            <Button
              title="Send"
              buttonStyle={{
                backgroundColor: "rgba(78, 116, 289, 1)",
                borderRadius: 3,
              }}
              containerStyle={{
                width: 100,
              }}
              onPress={() => {
                completeOrder();
              }}
            />
          </View>
        </View>
      </Overlay>
    </KeyboardAvoidingView>
  );
};
const overlayRejectStyle = StyleSheet.create({
  btnContainer: {
    marginTop: 30,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },
  txtCancellation: {
    width: "100%",
    height: 130,
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#e6e6e6",
    backgroundColor: "#f0f0f0",
    marginTop: 15,
    textAlignVertical: "top",
  },
  successIcon: {
    height: 80,
    width: 80,
    marginBottom: 30,
    color: "#4575de",
    alignSelf: "center",
  },
  txtOverlaySub: {
    height: "auto",
    fontWeight: "normal",
    fontSize: 15,
    color: "#4575de",
    textAlign: "center",
  },
  txtOverlay: {
    height: "auto",
    fontWeight: "bold",
    fontSize: 18,
    color: "#4575de",
    textAlign: "center",
    marginBottom: 20,
  },
  Container: {
    height: "auto",
    width: "auto",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
const overlaySuccessStyle = StyleSheet.create({
  successIcon: {
    height: 80,
    width: 80,
    marginBottom: 30,
    color: "#4575de",
    alignSelf: "center",
  },
  txtOverlay: {
    width: "100%",
    height: "auto",
    fontWeight: "bold",
    fontSize: 17,
    color: "#4575de",
    textAlign: "center",
  },
  Container: {
    height: "auto",
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
const cartListStyle = StyleSheet.create({
  lblBtnCancel: {
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    fontSize: 18,
  },
  btnCancel: {
    width: "100%",
    padding: 10,
    alignSelf: "center",
    borderRadius: 4,
    backgroundColor: "#f0993c",
  },
  btnCancelContainer: {
    width: "100%",
    height: "auto",
    padding: 30,
    backgroundColor: "white",
  },
  dateTimeDelivered: {
    width: "100%",
    height: "auto",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 0,
  },
  OrderNumber2: {
    width: "100%",
    height: "auto",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 50,
  },
  subPaymentDetails: {
    width: "100%",
    height: "auto",
    padding: 10,
    display: "flex",
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  lblOrderNumber: {
    textAlign: "center",
    color: "gray",
    fontSize: 16,
  },
  lblOrderNumberValue: {
    textAlign: "center",
    marginBottom: 0,
    fontWeight: "bold",
    fontSize: 18,
  },
  OrderNumber: {
    width: "100%",
    height: "auto",
    padding: 10,
    // paddingLeft: 30,
    // paddingRight: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ededed",
  },
  subContentEstImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
  },
  subContenTextEsAddress: {
    width: "100%",
    textAlign: "center",
    marginBottom: 10,
    color: "gray",
    fontSize: 16,
  },
  subContenTextEstName: {
    width: "100%",
    textAlign: "center",
    marginBottom: 0,
    fontWeight: "bold",
    fontSize: 18,
  },
  subContenText: {
    width: "100%",
    textAlign: "center",
    marginBottom: 10,
  },
  subContent: {
    width: "100%",
    padding: 20,
    height: "auto",
  },
  qtyCtrl: {},

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
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  txtFoodQTYPriceTotal: {
    fontSize: 15,
    color: "#b5b3b3",
    fontWeight: "bold",
    backgroundColor: "white",
    marginLeft: 60,
  },
  txtFoodQTY: {
    fontSize: 14,
    color: "#c2c2c2",
    backgroundColor: "white",
  },
  txtFoodPrice: {
    width: 120,
    fontSize: 14,
    color: "#7035a1",
    backgroundColor: "white",
    fontWeight: "bold",
  },
  txtFoodName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    backgroundColor: "white",
  },
  foodQTYPriceContainer: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
  },
  foodNameContainer: {
    backgroundColor: "white",
    paddingTop: 5,
    paddingBottom: 5,
  },
  foodDetailsContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    backgroundColor: "white",
    paddingLeft: 5,
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
    backgroundColor: "white",
    borderRadius: 12,
  },
  foodIMGContainer: {
    display: "flex",
    flexBasis: 70,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingLeft: 15,
  },
  cbFood: {
    backgroundColor: "white",
    margin: 0,
    padding: 0,
  },
  cbContainer: {
    flexBasis: 35,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    width: "100%",
  },
  cartFood: {
    width: "100%",
    marginBottom: 10,
    height: "auto",
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
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
  },
  cartList: {
    padding: 10,
    width: "100%",
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 15,
  },
});
const orderDetailsModalList = StyleSheet.create({
  cartItemContainer: {
    width: "100%",
    height: "auto",
  },
  ModalMainList: {
    width: "100%",
    height: "auto",
  },
});
const RiderModalOrderDetails = StyleSheet.create({
  txtRiderNumber: {
    fontSize: 15,
    fontWeight: "bold",
  },
  txtRiderName: {
    fontSize: 20,
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

  paymentA: {
    flexBasis: "75%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingTop: 20,
    backgroundColor: "transparent",
    // alignItems: "left",
  },
  RiderIcon: {
    flexBasis: "25%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  ViewMain: {
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "row",
    height: 120,
    borderRadius: 0,
    overflow: "hidden",
  },
});
const ModalOrderDetails = StyleSheet.create({
  txtTopTitleHeaderSub: {
    fontWeight: "normal",
    fontSize: 13,
    color: "white",
  },
  txtTopTitleHeader: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  orderDetailsTopHeaderSub: {
    // marginBottom: 20,
    width: "100%",
    height: "auto",
    padding: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2bbd7b",
  },
  orderDetailsTopHeader: {
    width: "100%",
    height: "auto",
    padding: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#19d480",
  },
  orderDetailsMainContainer: {
    width: "100%",
    height: "auto",
  },
  UserDetailsMainContainer: {
    padding: 5,
    borderRadius: 2,
    backgroundColor: "#f5f5f5",
    height: "auto",
    width: "100%",
  },
  UserDetailsContainer: {
    width: "100%",
    height: "auto",
    padding: 10,
  },
  txtTopTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
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
    backgroundColor: "#19d480",
    padding: 7,
    justifyContent: "flex-start",
  },
  MainModal: {
    flex: 1,
    backgroundColor: "#2bbd7b",
    width: "100%",
  },
});
const profileStyle = StyleSheet.create({
  ListCont: {
    width: "100%",
  },
  // ORDERS SECTION
  OrderTabContainer: {
    width: "100%",
    height: 500,
    backgroundColor: "#fafafa",
    marginTop: 10,
    borderRadius: 4,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#fafafa",
  },
  txtOrderHeaderTitle: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    color: "#8d41cc",
    fontWeight: "bold",
    padding: 5,
    fontSize: 20,
  },
  MyOrderSection: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    marginTop: 10,
  },

  // TOP HEADER SECTION
  txtEditProfile: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  btnEditProfile: {
    marginRight: 0,
    padding: 6,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#39b89c",
    marginTop: 20,
    borderRadius: 6,
  },
  btnEditProfileContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  txtMyOrderHeader: {
    fontWeight: "bold",
    fontSize: 14,
    width: "100%",
    marginBottom: 5,
    marginTop: 15,
    color: "#4b5594",
  },

  txtProfileAddress: {
    fontWeight: "normal",
    fontSize: 14,
    width: "100%",
    marginBottom: 5,
    color: "gray",
  },
  txtProfileName: {
    fontWeight: "bold",
    fontSize: 18,
    width: "100%",
    marginBottom: 5,
    color: "black",
  },
  txtProfile: {
    fontWeight: "bold",
    fontSize: 16,
    width: "100%",
    marginBottom: 5,
    color: "gray",
    textAlign: "center",
  },
  HeaderProfile: {
    width: "100%",
    height: "auto",
    backgroundColor: "#d4eeff",
    borderWidth: 1,
    borderColor: "white",
    padding: 15,
    borderRadius: 10,
  },
  profileScroller: {
    width: "100%",
    flex: 1,
  },
  ProfileMain: {
    padding: 10,
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
});
export default ProfileNav;
// const screens = {
//   ProfileNav: {
//     title: "Hello",
//     screen: ProfileNav,
//     navigationOptions: {
//       activeColor: "white",
//       inactiveColor: "white",
//       barStyle: {
//         backgroundColor: "white",
//         borderTopWidth: 2,
//         borderTopColor: "#dedede",
//       },
//       tabBarIcon: <Icon name="home" size={25} style={{ color: "red" }} />,
//     },
//   },
//   Profile: {
//     screen: Profile,
//     navigationOptions: {
//       tabBarLabel: "Search",
//       activeColor: "#a62b2b",
//       inactiveColor: "#000000",

//       barStyle: {
//         backgroundColor: "white",
//         borderTopWidth: 2,
//         borderTopColor: "#dedede",
//       },
//       tabBarIcon: <Icon name="search" size={25} style={{ color: "red" }} />,
//     },
//   },
// };
// const stackNavigator = createStackNavigator(screens);
// export default createAppContainer(stackNavigator);
