import React, {useEffect, useRef, useState} from "react";
import clsx from "clsx";
import {SubmenuView} from "./DropdownSubmenuView.tsx";
import {ItemList} from "./DropdownItemList.tsx";
import {DropdownButton} from "./DropdownButton.tsx";

export interface DropdownLinkItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export interface DropdownSubmenuItem {
  label: string;
  icon: React.ReactNode;
  submenu: SubmenuDefinition;
}

export interface SubmenuDefinition {
  title: string;
  content: React.ReactNode;
}

export type DropdownItem = DropdownLinkItem | DropdownSubmenuItem;

export interface DropdownProps {
  label?: string;
  icon?: React.ReactNode;
  items: DropdownItem[];
  align?: "left" | "right";
}
export const Dropdown = ({
                           label,
                           icon,
                           items,
                           align = "right",
                         }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [submenu, setSubmenu] = useState<SubmenuDefinition | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSubmenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    setSubmenu(null);
  };

  const handleItemClick = (item: DropdownItem) => {
    if ("onClick" in item) {
      item.onClick();
      setIsOpen(false);
    } else if ("submenu" in item) {
      setSubmenu(item.submenu);
    }
  };

  return (
      <div className="relative inline-block" ref={ref}>
        <DropdownButton icon={icon} label={label} onClick={toggleDropdown} />

        {isOpen && (
            <div
                className={clsx(
                    "absolute mt-2 w-56 rounded-xl overflow-hidden shadow-lg bg-background border border-borders z-50 transition-all animate-fade-in",
                    align === "right" ? "right-0" : "left-0"
                )}
            >
              {submenu ? (
                  <SubmenuView submenu={submenu} onBack={() => setSubmenu(null)} />
              ) : (
                  <ItemList items={items} onItemClick={handleItemClick} />
              )}
            </div>
        )}
      </div>
  );
};
