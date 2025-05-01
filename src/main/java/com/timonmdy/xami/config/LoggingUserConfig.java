package com.timonmdy.xami.config;

import com.timonmdy.xami.core.annotations.config.ConfigFile;
import com.timonmdy.xami.core.annotations.config.ConfigProperty;
import com.timonmdy.xami.core.configurations.ConfigEntry;

@ConfigFile("logging.properties")
public class LoggingUserConfig {

    @ConfigProperty("logging.themes.cache.changes")
    public static ConfigEntry<Boolean> LOG_THEME_CACHE_CHANGES =
            new ConfigEntry<>(
                    Boolean.class,
                    false,
                    "Whether to log changes to the theme cache.");


}
