import { View } from "react-native";
import { Spinner } from "@ui-kitten/components";
import React from "react";

import useLoading from "../hooks/useLoading";

const LoadingScreen = () => {
  const { isLoading } = useLoading();
  return (
    <>
      {isLoading && (
        // make loading screen
        <View className="flex justify-center items-center h-full w-full bg-gray-100 opacity-70 z-50 top-0 bottom-0 left-0 right-0 absolute">
          <View className="bg-blue-500 p-12 rounded-md opacity-100">
            <Spinner status="control" size={"medium"} />
          </View>
        </View>
      )}
    </>
  );
};

export default LoadingScreen;
