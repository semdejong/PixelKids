import { useNavigate } from "react-router-dom";

import useLoading from "../../../../hooks/useLoading";
import useCookies from "../../../../hooks/useCookies";

import {
  login as loginEndpoint,
  logout as logoutEndpoint,
  register as registerEndpoint,
} from "../../../../API/Auth";

export default function useAuthHook() {
  const { startLoading, stopLoading } = useLoading();
  const { deleteCookie } = useCookies();
  const navigate = useNavigate();

  const register = async (fullname, email, password) => {
    startLoading();
    await registerEndpoint(fullname, email, password);
    stopLoading();
  };

  const login = async (email, password) => {
    startLoading();
    await loginEndpoint(email, password);
    stopLoading();
    navigate("/factory");
  };

  const logout = async () => {
    startLoading();
    await logoutEndpoint();
    stopLoading();

    deleteCookie("isAuth");
    deleteCookie("session");

    navigate("/auth/login");
  };

  return {
    register,
    login,
    logout,
  };
}
