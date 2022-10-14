import { View, Text, SafeAreaView, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";
import React from "react";
import { Bars3Icon } from "react-native-heroicons/solid";

const Header = ({ navigation }) => {
  if (!navigation) {
    return <Text>You should pass navigation prop</Text>;
  }

  const route = useRoute();

  return (
    <View className="h-24  flex justify-center p-4 border border-spacing-2 t.shadowLg">
      <SafeAreaView className="flex flex-row justify-between">
        <View className="w-1/3 flex justify-center">
          {/* Left header */}
          <Pressable onPress={() => navigation.openDrawer()}>
            <Bars3Icon size={35} color="black" />
          </Pressable>
        </View>
        <View className="w-1/3 flex items-center justify-center">
          {/* middle header */}
          <Text className="text-lg font-bold">{route.name}</Text>
        </View>
        <View className="w-1/3 flex items-end  justify-center">
          {/* Right header */}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Header;
