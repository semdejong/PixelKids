import { View, Text, SafeAreaView } from "react-native";
import { useLayoutEffect } from "react";
import { Input, Button, Spinner } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import useLogin from "../hooks/useLogin";

import { login } from "../API/Auth";

const LoadingIndicator = () => (
  <View>
    <Spinner size="small" />
  </View>
);

const LoginScreen = ({ navigation }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    setErrorMessage,
    loading,
    handleLogin,
  } = useLogin();

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
