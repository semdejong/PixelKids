import React from "react";
import { View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import LoadingScreen from "./LoadingScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DrawerContent from "./DrawerContent";
import ExtraScreen from "../screens/ExtraScreen";

const Navigation = () => {
  const Drawer = createDrawerNavigator();

  return (
    <View className="h-full w-full relative">
      <LoadingScreen />
      <Drawer.Navigator
        initialRouteName={"Login"}
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Register" component={RegisterScreen} />
        <Drawer.Screen name="Extra" component={ExtraScreen} />
      </Drawer.Navigator>
    </View>
  );
};

export default Navigation;
