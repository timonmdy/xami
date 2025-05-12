import { FaHome, FaBookmark, FaHistory, FaCompass  } from "react-icons/fa";

export const sidebarItems = [
    { icon: FaHome, label: "Home", to: "/" },
    { icon: FaCompass, label: "Discover", to: "/discover" },
    { icon: FaBookmark, label: "Watchlist", to: "/watchlist" },
    { icon: FaHistory, label: "History", to: "/history" }
];