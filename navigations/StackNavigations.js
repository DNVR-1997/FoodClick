import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Login from "../components/screens/Login";
import Home from "../components/screens/Home";
import HomeNav from "../components/screens/HomeNav";
import Register from "../components/screens/Register";
const screens = {
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false,
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      headerShown: false,
    },
  },
};

const UserStack = createStackNavigator(screens);
export default createAppContainer(UserStack);
