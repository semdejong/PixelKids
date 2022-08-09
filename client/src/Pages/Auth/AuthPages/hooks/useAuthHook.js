import useLoading from "../../../../hooks/useLoading";
import {
  login as loginEndpoint,
  logout as logoutEndpoint,
  register as registerEndpoint,
} from "../../../../API/Auth";

export default function useAuthHook() {
  const { startLoading, stopLoading } = useLoading();

  const register = async (fullname, email, password) => {
    startLoading();
    await registerEndpoint(fullname, email, password);
    stopLoading();
  };

  const login = async (email, password) => {
    startLoading();
    await loginEndpoint(email, password);
    stopLoading();
  };

  const logout = () => {
    startLoading();
    logoutEndpoint()
      .then(() => {
        stopLoading();
      })
      .catch(() => {
        stopLoading();
      });
  };

  return {
    register,
    login,
    logout,
  };
}
