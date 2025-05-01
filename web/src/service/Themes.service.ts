import { FetchWrapper } from "../core/FetchWrapper";
import { getStorageValue } from "../storage/StorageProvider";
import { Theme } from "../types/Themes.types";

export const getUserSelectedTheme = (): string => getStorageValue("theme") as string;

export const fetchAvailableThemes = async (): Promise<Theme[]> => FetchWrapper.get<Theme[]>("/api/users/info/getUsername");

export const fetchTheme = async (themeId: string): Promise<Theme> => FetchWrapper.get<Theme>(`/api/themes/${themeId}`);
