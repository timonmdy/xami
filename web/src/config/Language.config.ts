// languageIndex.ts
export const LanguageKey = {
    ERROR_PAGE_NOT_FOUND: "error.page_not_found",
    ERROR_UNEXPECTED: "error.unexpected",
    AUTH_USERNAME: "auth.username",
    AUTH_PASSWORD: "auth.password",
    AUTH_REGISTER: "auth.register",
    AUTH_REGISTER_TITLE: "auth.register.title",
    AUTH_REGISTER_REGISTER_HERE: "auth.register.register_here",
    AUTH_LOGIN: "auth.login",
    AUTH_LOGIN_TITLE: "auth.login.title",
    AUTH_LOGIN_LOGIN_HERE: "auth.login.login_here",
    AUTH_NO_ACCOUNT: "auth.no_account",
    AUTH_ALREADY_HAVE_ACCOUNT: "auth.already_have_account",
    AUTH_LOGOUT: "auth.logout",
    AUTH_OR: "auth.or",
    AUTH_USERNAME_PLACEHOLDER: "auth.username_placeholder",
    AUTH_PASSWORD_PLACEHOLDER: "auth.password_placeholder",
    SUCCESS_USER_REGISTERED: "success.user_registered",
    SUCCESS_TOKEN_REFRESHED: "success.token_refreshed",
    ERROR_USER_ALREADY_REGISTERED: "error.user_already_registered",
    ERROR_INVALID_CREDENTIALS: "error.invalid_credentials",
    ERROR_TOKEN_INVALID: "error.token_invalid",
    NAVBAR_MENU: "navbar.menu",
    NAVBAR_NOTIFICATIONS: "navbar.notifications",
    NAVBAR_APPS: "navbar.apps",
    NAVBAR_PROFILE: "navbar.profile",
    NAVBAR_DROPDOWN_LOGIN: "navbar.dropdown.login",
    NAVBAR_DROPDOWN_REGISTER: "navbar.dropdown.register",
    NAVBAR_DROPDOWN_LOGOUT: "navbar.dropdown.logout"
} as const;

export type LanguageKeyType = keyof typeof LanguageKey;

export const getLanguageKey = (key: LanguageKeyType): string => {
    return LanguageKey[key];
}
