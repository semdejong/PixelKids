import { useLayoutEffect } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "../shared/Header";

export default function ExtraScreen({ navigation }) {
  const navigationHook = useNavigation();

  useLayoutEffect(() => {
    navigationHook.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View>
      <Header navigation={navigation} />
      <SafeAreaView>
        <View className="p-4">
          <Text>This is the extra screen</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
