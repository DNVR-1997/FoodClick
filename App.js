import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { createBottomTabNavigator } from "@react-navigation-material-bottom-tab";
import Login from "./components/screens/Login";
import HomePage from "./components/screens/HomePage";
import Establishment from "./components/screens/Establishment";
import Search from "./components/screens/Search";
import Register from "./components/screens/Register";
import Cart from "./components/screens/Cart";
import ProfileNav from "./components/screens/ProfileNav";
import Profile from "./components/screens/Profile";
import ForgotPassword from "./components/screens/ForgotPassword";
import { Icon, Overlay, SearchBar } from "react-native-elements";
import HomeNav from "./components/screens/HomeNav";
const Stack = createNativeStackNavigator();
const StackHome = createNativeStackNavigator();
const StackProfile = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MyTabs" component={MyTabs} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        screenOptions={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
function HomeStack() {
  return (
    <StackHome.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackHome.Screen name="HomePage" component={HomePage} />
      <StackHome.Screen name="Establishment" component={Establishment} />
    </StackHome.Navigator>
  );
}
function ProfileStack() {
  return (
    <StackProfile.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <StackProfile.Screen name="My Profile" component={ProfileNav} />
      <StackProfile.Screen name="Profile" component={Profile} />
    </StackProfile.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBarOptions={{
        activeTintColor: "#fff",
        inactiveTintColor: "lightgray",
        activeBackgroundColor: "#5646a3",
        inactiveBackgroundColor: "#5f4db8",
        style: {
          backgroundColor: "#5f4db8",
          paddingBottom: 10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabelStyle: { marginBottom: 5 },
          tabBarLabel: "Home",
          activeColor: "white",
          inactiveColor: "#000000",
          barStyle: {
            backgroundColor: "#713fcc",
            borderTopWidth: 2,
            borderTopColor: "#dedede",
          },
          tabBarIcon: () => <Icon name="home" color={"white"} size={20} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabelStyle: { marginBottom: 5 },
          tabBarLabel: "Search",
          activeColor: "white",
          inactiveColor: "#000000",
          barStyle: {
            backgroundColor: "#713fcc",
            borderTopWidth: 2,
            borderTopColor: "#dedede",
          },
          tabBarIcon: () => <Icon name="search" color={"white"} size={20} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabelStyle: { marginBottom: 5 },
          tabBarLabel: "Cart",
          activeColor: "white",
          inactiveColor: "#000000",
          barStyle: {
            backgroundColor: "#713fcc",
            borderTopWidth: 2,
            borderTopColor: "#dedede",
          },
          tabBarIcon: () => (
            <Icon name="shopping-cart" color={"white"} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabelStyle: { marginBottom: 5 },
          tabBarLabel: "Account",
          activeColor: "white",
          inactiveColor: "#000000",
          barStyle: {
            backgroundColor: "#713fcc",
            borderTopWidth: 2,
            borderTopColor: "#dedede",
          },
          tabBarIcon: () => (
            <Icon name="account-circle" color={"white"} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

// import { StatusBar } from "expo-status-bar";
// import React from "react";
// import { StyleSheet, Text, View } from "react-native";
// import Login from "./components/screens/Login";
// import StackNavigation from "./navigations/StackNavigations";
// import BottomTabNavigations from "./navigations/BottomTabNavigations";
// export default function App({ navigation }) {
//   return (
//     <StackNavigation />
//     // <BottomTabNavigations />
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
