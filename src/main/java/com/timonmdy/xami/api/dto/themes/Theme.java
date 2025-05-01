package com.timonmdy.xami.api.dto.themes;

import lombok.Data;

import java.util.Map;

@Data
public class Theme {
    private String identifier;
    private String name;
    private String description;
    private Map<String, String> theme;
}
