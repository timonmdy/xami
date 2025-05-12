import LanguageSubmenu from "./Submenus/LanguageSubmenu.tsx";
import {SubmenuDefinition} from "../../lib/dropdown/Dropdown.tsx";
import { getLanguageKey } from "../../../config/Language.config.ts";
import UnknownSubmenu from "./Submenus/UnknownSubmenu.tsx";
import ThemeSubmenu from "./Submenus/ThemeSubmenu.tsx";
export const getNavbarSubmenu = (key: string): SubmenuDefinition => {
    switch (key) {
        case "language":
            return {
                title: "Select a language",
                content: <LanguageSubmenu />,
            };
        case "theme":
            return {
                title: "Select a theme",
                content: <ThemeSubmenu />,
            };
        default:
            return {
                title: getLanguageKey("ERROR_UNEXPECTED"),
                content: <UnknownSubmenu />,
            };
    }
};
