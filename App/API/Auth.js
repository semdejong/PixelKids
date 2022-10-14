import axios from "axios";
import { REACT_APP_BASE_URL } from "@env";

import getHeaders from "./headerPrepared";

export const register = async (fullname, email, password) => {
  const response = await axios
    .post(REACT_APP_BASE_URL + "/api/auth/register", {
      fullname,
      email,
      password,
    })
    .catch((err) => {
      return err.response;
    });

  return response;
};

export const login = async (email, password) => {
  const data = {
    email: email,
    password: password,
    isMobile: true,
  };

  const response = await axios
    .post(REACT_APP_BASE_URL + "/api/auth/login", data)
    .catch((err) => {
      return err.response;
    });

  return response;
};

export const logout = async () => {
  const response = await axios
    .get(REACT_APP_BASE_URL + `/api/auth/logout`)
    .catch((err) => {
      return err.response;
    });

  return response;
};

export const getApiKey = async () => {
  const response = await axios.post(`/api/auth/apikey`).catch((err) => {
    return err.response;
  });

  return response;
};

export const isSessionAlive = async () => {
  const response = await axios
    .get(REACT_APP_BASE_URL + `/api/test/alive`, await getHeaders())
    .catch((err) => {
      return err.response;
    });

  return response;
};
