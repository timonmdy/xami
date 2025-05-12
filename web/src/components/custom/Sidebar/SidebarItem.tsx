import { IconType } from "react-icons";
import { NavLink } from "react-router";
import { Tooltip } from "react-tooltip";

interface SidebarItemProps {
    icon: IconType;
    label: string;
    to: string;
    expanded: boolean;
}
export default function SidebarItem({ icon: Icon, label, to, expanded }: SidebarItemProps) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-4 px-3 py-3 rounded-lg text-sm font-medium ${!isActive && "hover:bg-cards/50"} transition-colors 
                ${isActive ? "bg-cards text-text-primary" : "text-text-secondary"}`
            }
            data-tooltip-id={!expanded ? label : undefined}
        >
            <Icon className="text-xl shrink-0" />
            {expanded && <span className="truncate">{label}</span>}
            {!expanded && (
                <Tooltip id={label} place="right">
                    {label}
                </Tooltip>
            )}
        </NavLink>
    );
}
