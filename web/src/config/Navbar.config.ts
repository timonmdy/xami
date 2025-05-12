// Navbar.config.ts
import {IoColorPalette, IoLanguage, IoLogInOutline, IoLogOutOutline, IoSettingsSharp,} from "react-icons/io5";
import {RiProfileLine} from "react-icons/ri";
import {IconType} from "react-icons";

export type Visibility = "authenticated" | "not_authenticated" | "always";

export interface NavbarDropdownItemConfig {
    key: string;
    labelKey: string;
    icon: IconType;
    visibleWhen: Visibility;
    submenuKey?: string; // Use this to refer to submenu content elsewhere
}

export const navbarDropdownItems: NavbarDropdownItemConfig[] = [
    {
        key: "login",
        labelKey: "navbar.dropdown.login",
        icon: IoLogInOutline,
        visibleWhen: "not_authenticated",
    },
    {
        key: "profile",
        labelKey: "navbar.profile",
        icon: RiProfileLine,
        visibleWhen: "authenticated",
    },
    {
        key: "language",
        labelKey: "Language",
        icon: IoLanguage,
        visibleWhen: "always",
        submenuKey: "language",
    },
    {
        key: "theme",
        labelKey: "Theme",
        icon: IoColorPalette,
        visibleWhen: "always",
        submenuKey: "theme",
    },
    {
        key: "settings",
        labelKey: "Settings",
        icon: IoSettingsSharp,
        visibleWhen: "authenticated"
    },
    {
        key: "logout",
        labelKey: "navbar.dropdown.logout",
        icon: IoLogOutOutline,
        visibleWhen: "authenticated",
    },
];
