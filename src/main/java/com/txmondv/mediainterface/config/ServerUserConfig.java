package com.txmondv.mediainterface.config;

import com.txmondv.mediainterface.core.annotations.config.ConfigFile;
import com.txmondv.mediainterface.core.annotations.config.ConfigProperty;
import com.txmondv.mediainterface.core.configurations.ConfigEntry;

@ConfigFile("server.properties")
public class ServerUserConfig {

    @ConfigProperty("webserver.port")
    public static ConfigEntry<Integer> WEBSERVER_PORT =
            new ConfigEntry<>(
                    Integer.class,
                    8080,
                    "The port the webserver should be served on");

    @ConfigProperty("api.secret_key")
    public static ConfigEntry<String> SECRET_KEY =
            new ConfigEntry<>(
                    String.class,
                    "enter_a_secret_key",
                    "Secret key to encode JWT tokens. Keep this secure and do not share it with anyone.");
}
