import axios from "axios";
import notification from "../Components/Notification";

export const register = async (fullname, email, password) => {
  const response = await axios
    .post("/api/auth/register", {
      fullname,
      email,
      password,
    })
    .catch((err) => {
      return err.response;
    });

  if (response.status === 200) {
    notification("Register successful", "Registration successful", "success");
  } else {
    notification("Register failed", response.data.message, "error");
  }

  return response;
};

export const login = async (email, password) => {
  const data = {
    email: email,
    password: password,
  };

  const response = await axios.post(`/api/auth/login`, data).catch((err) => {
    return err.response;
  });

  if (response.status === 200) {
    document.cookie = "isAuth= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "isAuth=true; " + response.data.expiryDate + "; path=/";
    notification(
      "Login succesful",
      "You have successfully logged in.",
      "success"
    );
  } else {
    notification("Login failed", "Please check your credentials.", "error");
  }

  return response;
};

export const logout = async () => {
  const response = await axios.get(`/api/auth/logout`).catch((err) => {
    return err.response;
  });

  if (response.status === 200) {
    document.cookie = "isAuth= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    notification(
      "Logout succesfull",
      "You have successfully logged out.",
      "success"
    );
  } else {
    notification("Logout failed", "Something went wrong.", "error");
  }

  return response;
};

export const getApiKey = async () => {
  const response = await axios.post(`/api/auth/apikey`).catch((err) => {
    return err.response;
  });

  if (response.status === 200) {
    notification(
      "API key generated",
      "Your API key has been generated.",
      "info"
    );
  } else {
    notification("API key failed", "Something went wrong.", "error");
  }

  return response;
};
