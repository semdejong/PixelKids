import * as SecureStore from "expo-secure-store";

export default async function getHeaders() {
  const sessionToken = await SecureStore.getItemAsync("sessionToken");

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Bearer " + (sessionToken ? sessionToken : "no-session-token"),
    },
  };
  return headers;
}
