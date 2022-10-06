import axios from "axios";
import notification from "../Components/Notification";
import handleResponse from "../API/responseHandler";

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

  handleResponse(response);

  if (response.status === 200) {
    notification("Register successful", "Registration successful", "success");
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
  }
  handleResponse(response);

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
  }

  handleResponse(response);

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
  }

  handleResponse(response);

  return response;
};
