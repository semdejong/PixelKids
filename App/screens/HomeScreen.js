import { Text, SafeAreaView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@ui-kitten/components";
import React, { useLayoutEffect } from "react";

import Objects from "../API/Objects";
import Header from "../shared/Header";

export default function HomeScreen({ navigation }) {
  const navigationHook = useNavigation();

  useLayoutEffect(() => {
    navigationHook.setOptions({
      headerShown: false,
    });
  }, []);

  const getObjects = async () => {
    const response = await Objects.get(
      "6303f4333a71851ad4d7ce00",
      1,
      20,
      {},
      { createdBy: "62f770d001a9611b40b6a039" }
    );
    console.log(response);
  };

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
