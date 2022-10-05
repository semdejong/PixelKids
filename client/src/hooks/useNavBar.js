import { useNavigate } from "react-router-dom";

import useAuthHook from "../Pages/Auth/AuthPages/hooks/useAuthHook";

export default function useNavBar() {
  const navigate = useNavigate();
  const { logout } = useAuthHook();

  const leftNavBar = [
    {
      label: "Factory",
      onClick: () => {
        navigate("/factory");
      },
      type: "link",
      show: document.cookie.includes("isAuth"),
    },
  ];

  const rightNavBar = [
    {
      label: "Logout",
      onClick: async () => {
        await logout();
      },
      type: "primary",
      show: document.cookie.includes("isAuth"),
    },
    {
      label: "Login",
      onClick: () => {
        navigate("/auth/login");
      },
      type: "primary",
      show: !document.cookie.includes("isAuth"),
    },
    {
      label: "Register",
      onClick: () => {
        navigate("/auth/register");
      },
      type: "primary",
      show: !document.cookie.includes("isAuth"),
    },
  ];

  return {
    leftNavBar,
    rightNavBar,
  };
}
