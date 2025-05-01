import { useState } from "react";
import SearchBar from "../lib/form/SearchBar";
import StyledButton from "../lib/buttons/StyledButton";

export default function HomePage() {
    const [searchValue, setSearchValue] = useState<string>("");

    return (
        <div className="flex items-center justify-center h-full p-20">
            <StyledButton className="mr-10">Dummy</StyledButton>
            <SearchBar value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        </div>
    );
}