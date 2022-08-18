import { useNavigate } from "react-router-dom";

export default function useFactorySideBar() {
  const navigate = useNavigate();

  const topSideBar = [
    {
      label: "Factory",
      onClick: () => {
        navigate("/factory");
      },
      icon: "fa-industry",
      show: document.cookie.includes("isAuth"),
    },
    {
      label: "Objects",
      onClick: () => {
        navigate("/factory/objects");
      },
      icon: "fa-database",
      show: document.cookie.includes("isAuth"),
    },
    {
      label: "Object Types",
      onClick: () => {
        navigate("/factory/objectType");
      },
      icon: "fa-cubes",
      show: document.cookie.includes("isAuth"),
    },
    {
      label: "Users",
      onClick: () => {
        navigate("/factory/users");
      },
      icon: "fa-users",
      show: document.cookie.includes("isAuth"),
    },
    {
      label: "Roles",
      onClick: () => {
        navigate("/factory/roles");
      },
      icon: "fa-scroll",
      show: document.cookie.includes("isAuth"),
    },
  ];

  const bottomSideBar = [
    {
      label: "Settings",
      onClick: () => {},
      icon: "fa-gears",
      show: document.cookie.includes("isAuth"),
    },
  ];

  return {
    topSideBar,
    bottomSideBar,
  };
}
