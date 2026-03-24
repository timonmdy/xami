package com.timonmdy.xami.api.dto.users.settings;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SettingValueResponse {
    private String key;
    private Object value;
    private boolean persisted;

}