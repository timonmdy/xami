// components/Dropdown.tsx
import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import clsx from "clsx";

interface DropdownItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface DropdownProps {
  label?: string;
  icon?: React.ReactNode;
  items: DropdownItem[];
  align?: "left" | "right";
}

export const Dropdown = ({ label, icon, items, align = "right" }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-cards hover:bg-accent text-text-primary rounded-xl transition-all"
      >
        {icon}
        {label && <span>{label}</span>}
        <FiChevronDown className="text-text-muted" />
      </button>
      {isOpen && (
        <div
          className={clsx(
            "absolute mt-2 w-48 rounded-xl shadow-lg bg-background border border-borders z-50 transition-all animate-fade-in",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsOpen(false);
                item.onClick();
              }}
              className={clsx(
                "w-full px-4 py-3 text-left flex items-center gap-3 text-text-primary",
                "hover:bg-cards",
                "focus:outline-none transition-all rounded-xl"
              )}
            >
              <span className="text-accent text-xl">{item.icon}</span>
              {item.label}
            </button>

          ))}
        </div>
      )}
    </div>
  );
};
