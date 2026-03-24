// NOTE: UserSettingKey is defined in your models — extend it there as you add settings.

import { UserSettingKey } from "../types/User.types";

// ─── Option type ──────────────────────────────────────────────────────────────

export interface SelectOption {
    label: string;
    value: string;
}

// ─── Setting Config Variants ──────────────────────────────────────────────────

interface BaseSettingConfig {
    key: UserSettingKey;
    label: string;
    description?: string;
    defaultValue: any;
}

export interface BooleanSettingConfig extends BaseSettingConfig {
    type: "boolean";
    defaultValue: boolean;
}

export interface StringSettingConfig extends BaseSettingConfig {
    type: "string";
    defaultValue: string;
    placeholder?: string;
    maxLength?: number;
    inputType?: "text" | "email" | "url" | "password";
}

export interface MultiSelectSettingConfig extends BaseSettingConfig {
    type: "multiselect";
    defaultValue: string[];
    options: SelectOption[];
    maxSelections?: number;
    single?: boolean;
}

export type SettingConfig =
    | BooleanSettingConfig
    | StringSettingConfig
    | MultiSelectSettingConfig;

// ─── Section & Page ───────────────────────────────────────────────────────────

export interface SettingSectionConfig {
    id: string;
    title: string;
    settings: SettingConfig[];
}

export interface SettingsPageConfig {
    id: string;
    label: string;
    /** react-icons component — pass the actual icon component at usage site */
    iconName: string;
    /** CSS color for the icon */
    iconColor: string;
    sections: SettingSectionConfig[];
}

// ─── SETTINGS DEFINITION — edit this to add/remove settings ──────────────────

export const SETTINGS_CONFIG: SettingsPageConfig[] = [
    {
        id: "appearance",
        label: "Appearance",
        iconName: "LuPalette",
        iconColor: "#a78bfa",
        sections: [
            {
                id: "theme",
                title: "Theme",
                settings: [
                    {
                        key: "theme",
                        type: "multiselect",
                        label: "Color Theme",
                        description: "Choose the overall color scheme of the application.",
                        defaultValue: ["dark"],
                        single: true,
                        options: [
                            { label: "Dark", value: "dark" },
                            { label: "Light", value: "light" },
                            { label: "System", value: "system" },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: "language",
        label: "Language & Region",
        iconName: "LuGlobe",
        iconColor: "#34d399",
        sections: [
            {
                id: "locale",
                title: "Locale",
                settings: [
                    {
                        key: "language",
                        type: "multiselect",
                        label: "Interface Language",
                        description: "The language used throughout the interface.",
                        defaultValue: ["en"],
                        single: true,
                        options: [
                            { label: "English", value: "en" },
                            { label: "Deutsch", value: "de" },
                            { label: "Français", value: "fr" },
                            { label: "Español", value: "es" },
                        ],
                    },
                ],
            },
        ],
    },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const getDefaults = (): Record<string, any> => {
    const d: Record<string, any> = {};
    for (const page of SETTINGS_CONFIG)
        for (const section of page.sections)
            for (const s of section.settings)
                d[s.key] = s.defaultValue;
    return d;
};

export const getAllKeys = (): UserSettingKey[] =>
    SETTINGS_CONFIG.flatMap((p) =>
        p.sections.flatMap((sec) => sec.settings.map((s) => s.key))
    );
