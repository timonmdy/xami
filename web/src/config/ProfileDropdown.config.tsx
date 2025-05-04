import {
  IoLogInOutline,
  IoPersonAddOutline,
  IoLogOutOutline
} from "react-icons/io5";
import { ReactNode } from "react";
import { RiProfileLine } from "react-icons/ri";

export type Visibility = "authenticated" | "not_authenticated" | "always";

export interface NavbarDropdownItem {
  labelKey: string;
  icon: ReactNode;
  onClick: () => void;
  visibleWhen: Visibility;
}

export const getNavbarDropdownItems = (
  handlers: {
    openLogin: () => void;
    openRegister: () => void;
    handleLogout: () => void;
  }
): NavbarDropdownItem[] => [
    {
      labelKey: "navbar.dropdown.login",
      icon: <IoLogInOutline />,
      onClick: handlers.openLogin,
      visibleWhen: "not_authenticated",
    },
    {
      labelKey: "navbar.dropdown.register",
      icon: <IoPersonAddOutline />,
      onClick: handlers.openRegister,
      visibleWhen: "not_authenticated",
    },
    {
      labelKey: "navbar.profile",
      icon: <RiProfileLine />,
      onClick: () => console.log("Profile clicked"),
      visibleWhen: "authenticated",
    },
    {
      labelKey: "navbar.dropdown.logout",
      icon: <IoLogOutOutline />,
      onClick: handlers.handleLogout,
      visibleWhen: "authenticated",
    },
  ];
