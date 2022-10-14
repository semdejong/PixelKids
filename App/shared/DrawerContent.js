import { View, SafeAreaView, Text, Pressable } from "react-native";
import { Button } from "@ui-kitten/components";
import { useNavigationState } from "@react-navigation/native";
import React from "react";
import {
  XMarkIcon,
  ArrowLeftOnRectangleIcon,
} from "react-native-heroicons/solid";

import useLogin from "../hooks/useLogin";

const DrawerContent = ({ navigation, ...props }) => {
  const { handleLogout } = useLogin();

  const state = useNavigationState((state) => state);
  const routeName = state?.routeNames[state.index];

  const ingnoredRoutes = ["Login", "Register"];

  return (
    <View className="w-full h-full p-4">
      <SafeAreaView className="w-full h-full p-10">
        <View className="w-full flex flex-row justify-end">
          <Pressable className="ml-4" onPress={() => navigation.closeDrawer()}>
            <XMarkIcon size={35} color="black" />
          </Pressable>
        </View>
        <View className="w-full flex flex-col justify-center items-center">
          <Text className="text-2xl font-bold">Drawer Content</Text>
        </View>
        <View className="w-full h-5/6 justify-between mt-4">
          <View className="flex-1 space-y-4">
            {props.state.routeNames
              .filter((route, index) => !ingnoredRoutes.includes(route))
              .map((route, index) => {
                return (
                  <Button
                    key={index}
                    onPress={() => {
                      navigation.navigate(route);
                    }}
                    appearance={routeName === route ? "primary" : "outline"}
                  >
                    <Text className=" text-lg font-bold">{route}</Text>
                  </Button>
                );
              })}
          </View>
          <View>
            <Button
              accessoryLeft={<ArrowLeftOnRectangleIcon />}
              onPress={handleLogout}
            >
              Log out
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default DrawerContent;
