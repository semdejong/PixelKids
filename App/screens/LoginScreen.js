import { View, Text, SafeAreaView } from "react-native";
import { useLayoutEffect, useState } from "react";
import { Input, Button, Spinner } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import { login } from "../API/Auth";

const LoadingIndicator = () => (
  <View>
    <Spinner size="small" />
  </View>
);

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigationHook = useNavigation();

  useLayoutEffect(() => {
    navigationHook.setOptions({
      headerShown: false,
      swipeEnabled: false,
    });
    setEmail("");
    setPassword("");
    setErrorMessage("");
  }, []);

  const handleLogin = async () => {
    setErrorMessage("");
    setLoading(true);
    const response = await login(email, password);
    setLoading(false);

    if (response.status === 200) {
      navigation.navigate("Home");
    } else {
      setErrorMessage(response.data.message);
    }
  };

  return (
    <SafeAreaView>
      <View className="p-4 space-y-4">
        <Text className="text-2xl font-bold">Login</Text>
        <Text className="text-red-500">{errorMessage}</Text>
        <View>
          <Text className="text-gray-500">Enter your email address</Text>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={(nextValue) => setEmail(nextValue)}
          />
        </View>
        <View>
          <Text className="text-gray-500">Enter your password</Text>
          <Input
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={(nextValue) => setPassword(nextValue)}
          />
        </View>

        {!loading ? (
          <Button onPress={() => handleLogin()}>LOGIN</Button>
        ) : (
          <Button appearance="outline" accessoryLeft={LoadingIndicator}>
            LOGIN
          </Button>
        )}
        <Button
          appearance="outline"
          onPress={() => navigation.navigate("Register")}
        >
          REGISTER
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
