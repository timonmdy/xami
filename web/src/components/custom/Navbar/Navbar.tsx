import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IoApps,
  IoAppsOutline,
  IoNotifications,
  IoNotificationsOutline,
  IoPersonCircleOutline
} from "react-icons/io5";
import { getNavbarDropdownItems } from "../../../config/ProfileDropdown.config";
import { useIsAuthenticated } from "../../../hooks/Auth.hooks";
import { logout } from "../../../service/Auth.service";
import IconButton from "../../lib/buttons/IconButton";
import { Dropdown } from "../../lib/dropdown/Dropdown";
import { LoginModal } from "../Auth/LoginModal";
import { RegisterModal } from "../Auth/RegisterModal";
import NavbarSearch from "./NavbarSearch";
import { HiOutlineMenu } from "react-icons/hi";


const Navbar: React.FC = () => {
  const { t: lang } = useTranslation();

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const { isAuthenticated } = useIsAuthenticated();

  const handlers = {
    openLogin: () => setShowLogin(true),
    openRegister: () => setShowRegister(true),
    handleLogout: () => {
      logout().then(() => {
        window.location.reload();
      })
    },
  };

  const allItems = getNavbarDropdownItems(handlers);
  const filteredItems = allItems.filter(item =>
    item.visibleWhen === "always" ||
    (item.visibleWhen === "authenticated" && isAuthenticated) ||
    (item.visibleWhen === "not_authenticated" && !isAuthenticated)
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-background flex items-center justify-between px-2 md:pr-4">
        {/* Left Section: Menu and Logo */}
        <div className="flex items-center space-x-4">
          <IconButton
            aria-label="Menu"
            className="hidden md:inline-flex text-2xl"
            icon={<HiOutlineMenu />}
          />
          <div className={`flex items-center`}>
            {/* Logo can be an image or text, here we use a placeholder */}
          </div>
        </div>

        {/* Center Section: Search */}
        <div className="flex-1 flex justify-center px-4 lg:px-8">
          <NavbarSearch />
        </div>

        {/* Right Section: Profile Options */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <IconButton
            aria-label="Menu"
            className="hidden md:inline-flex"
            icon={<IoAppsOutline size={24} />}
            iconFocus={<IoApps size={24} color="white" />}
          />
          <IconButton
            aria-label="Menu"
            className="hidden md:inline-flex"
            icon={<IoNotificationsOutline size={24} />}
            iconFocus={<IoNotifications size={24} color="white" />}
          />
          <Dropdown
            icon={<IoPersonCircleOutline size={24} />}
            items={filteredItems.map(item => ({
              label: lang(item.labelKey),
              icon: item.icon,
              onClick: item.onClick,
            }))}
          />
        </div>
      </nav>
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} onSwitch={() => {
        setShowLogin(false);
        setShowRegister(true);
      }} />
      <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} onSwitch={() => {
        setShowRegister(false);
        setShowLogin(true);
      }} />
    </>
  );
};

export default Navbar;
