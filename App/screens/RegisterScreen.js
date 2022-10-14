import { View, Text, SafeAreaView } from "react-native";
import { useLayoutEffect, useState } from "react";
import { Input, Button, Spinner } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import { register } from "../API/Auth";

const LoadingIndicator = () => (
  <View>
    <Spinner size="small" />
  </View>
);

const RegisterScreen = ({ navigation }) => {
  const [fullname, setFullname] = useState("");
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
  }, []);

  const handleRegister = async () => {
    setErrorMessage("");
    setLoading(true);
    const response = await register(fullname, email, password);
    setLoading(false);

    if (response.status === 200) {
      navigation.navigate("Login");
    } else {
      setErrorMessage(response.data.message);
    }
  };

  return (
    <SafeAreaView>
      <View className="p-4 space-y-4">
        <Text className="text-2xl font-bold">Register</Text>
        <Text className="text-red-500">{errorMessage}</Text>
        <View>
          <Text className="text-gray-500">Enter your fullname</Text>
          <Input
            placeholder="Fullname"
            value={fullname}
            onChangeText={(nextValue) => setFullname(nextValue)}
          />
        </View>
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
          <Button onPress={() => handleRegister()}>Register</Button>
        ) : (
          <Button appearance="outline" accessoryLeft={LoadingIndicator}>
            Register
          </Button>
        )}
        <Button
          appearance="outline"
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
