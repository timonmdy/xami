type StorageKey = 
    | "language" // CHANGED TO DB STORAGE IN THE FUTURE
    | "theme" // CHANGED TO DB STORAGE IN THE FUTURE
    | "sidebarLocked";

const defaultValues: Record<StorageKey, unknown> = {
    "language": "en",
    "theme": "default-dark",
    "sidebarLocked": false
}

export const getStorageValue = (storageKey: StorageKey): unknown => {
    const storedValue = localStorage.getItem(storageKey);
    return storedValue ? JSON.parse(storedValue) : defaultValues[storageKey];
}

export const setStorageValue = (storageKey: StorageKey, value: unknown): void => {
    localStorage.setItem(storageKey, JSON.stringify(value));
}