import { useState } from "react";
import SidebarItem from "./SidebarItem";
import 'react-tooltip/dist/react-tooltip.css';
import { sidebarItems } from "../../../config/Sidebar.config.ts";

export default function Sidebar({ locked }: { locked: boolean }) {
    const [hovering, setHovering] = useState(false);
    const isExpanded = locked || hovering;

    return (
        <aside
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-background  z-40 transition-all duration-300 ease-in-out
                ${isExpanded ? "w-60" : "w-15"}`}
        >
            {/* Scrollable Container */}
            <div
                className={`h-full overflow-y-auto ${
                    isExpanded
                        ? "scrollbar-thin scrollbar-thumb-borders scrollbar-track-transparent"
                        : "scrollbar-none"
                }`}
            >
                <nav className="flex flex-col gap-1 px-2 pt-2">
                    {sidebarItems.map((item, index) => (
                        <SidebarItem key={index} {...item} expanded={isExpanded} />
                    ))}
                </nav>
            </div>
        </aside>
    );
}
