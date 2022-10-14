import { Text, SafeAreaView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@ui-kitten/components";
import React, { useLayoutEffect } from "react";
import * as SecureStore from "expo-secure-store";

import useLoading from "../hooks/useLoading";
import Objects from "../API/Objects";
import Header from "../shared/Header";

export default function HomeScreen({ navigation }) {
  const navigationHook = useNavigation();
  const { startLoading, stopLoading } = useLoading();

  useLayoutEffect(() => {
    navigationHook.setOptions({
      headerShown: false,
    });
  }, []);

  const getObjects = async () => {
    // const response = await Objects.get(
    //   "6303a63a9fe67e0c3d2d9fb4",
    //   1,
    //   20,
    //   {},
    //   { createdBy: "62f770d001a9611b40b6a039" }
    // );

    startLoading();
    const response = await Objects.get(
      "6303a63a9fe67e0c3d2d9fb4",
      1,
      20,
      {},
      {}
    );
    stopLoading();
    console.log(response, await SecureStore.getItemAsync("sessionToken"));
  };

  const RCTNetworking = require("react-native/Libraries/Network/RCTNetworking");
  RCTNetworking.clearCookies(() => {});

  return (
    <View>
      <Header navigation={navigation} />
      <SafeAreaView className="">
        <View className="p-4">
          <Text className="text-red-500">HomeScreen</Text>
          <Button onPress={() => getObjects()}>Get objects</Button>
          <Button onPress={() => navigation.openDrawer()}>Login</Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
