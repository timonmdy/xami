import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full pl-10 pr-3 py-2 rounded-lg border border-text-secondary
          bg-cards text-text-primary placeholder-text-secondary
          focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
          transition duration-200 ease-in-out
        `}
      />
    </div>
  );
};

export default SearchBar;
