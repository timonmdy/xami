package com.timonmdy.xami.api.dto.users.settings;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@NoArgsConstructor
public class UpdateSettingRequest {
    private Object value;
}
