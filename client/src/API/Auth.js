import axios from "axios";

export const register = async (fullname, email, password) => {
  const response = await axios
    .post("api/auth/register", {
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
  };

  const response = await axios.post(`api/auth/login`, data).catch((err) => {
    return err.response;
  });

  if (response.status === 200) {
    document.cookie = "isAuth= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "isAuth=true; " + response.data.expiryDate + "; path=/";
  }

  return response;
};

export const logout = async () => {
  const response = await axios.get(`api/auth/logout`).catch((err) => {
    return err.response;
  });

  if (response.status === 200) {
    document.cookie = "isAuth= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  }

  return response;
};
