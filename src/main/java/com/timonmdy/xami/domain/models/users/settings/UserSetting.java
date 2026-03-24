package com.timonmdy.xami.domain.models.users.settings;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@AllArgsConstructor
@Getter
public enum UserSetting {

    THEME("dark_mode", SettingType.BOOLEAN, "false"),
    LANGUAGE("language", SettingType.STRING, "en");


    private final String key;
    private final SettingType type;
    private final String defaultValue;

    public static UserSetting fromKey(String key) {
        return Arrays.stream(values())
                .filter(s -> s.key.equals(key))
                .findFirst()
                .orElseThrow();
    }
}
