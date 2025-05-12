package com.timonmdy.xami.config;

import com.timonmdy.xami.core.annotations.config.DataConfigContent;
import com.timonmdy.xami.core.annotations.config.DefaultConfigFile;
import com.timonmdy.xami.core.annotations.config.JsonConfigFile;

@JsonConfigFile("app-data.json")
@DefaultConfigFile("app-data.json")
public class AppDataConfig {


    @DataConfigContent
    public static Object APP_DATA;

}
