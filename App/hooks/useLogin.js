import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

import useLoading from "./useLoading";
import { login, isSessionAlive } from "../API/Auth";

export default function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    //Check if user has a saved session
    getLoggedIn().then((value) => {
      if (value) {
        navigation.navigate("Home");
      }
    });

    setEmail("");
    setPassword("");
    setErrorMessage("");
  }, []);

  const getLoggedIn = async () => {
    try {
      startLoading();
      const value = await SecureStore.getItemAsync("sessionToken");
      if (value !== null) {
        const response = await isSessionAlive();
        if (response.status === 200) {
          stopLoading();
          return true;
        } else {
          await SecureStore.deleteItemAsync("sessionToken");
          stopLoading();
          return false;
        }
      } else {
        stopLoading();
        return false;
      }
    } catch (e) {
      stopLoading();
      console.log(e);
    }
  };

  const handleLogout = async () => {
    try {
      startLoading();
      await SecureStore.deleteItemAsync("sessionToken");
      navigation.navigate("Login");
      stopLoading();
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogin = async () => {
    try {
      setErrorMessage("");
      setLoading(true);
      const response = await login(email, password);
      setLoading(false);

      if (response.status === 200) {
        await SecureStore.setItemAsync(
          "sessionToken",
          response.data.sessionToken
        );
        navigation.navigate("Home");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    setErrorMessage,
    loading,
    setLoading,
    handleLogin,
    handleLogout,
  };
}
