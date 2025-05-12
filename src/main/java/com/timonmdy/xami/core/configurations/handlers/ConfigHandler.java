package com.timonmdy.xami.core.configurations.handlers;

public interface ConfigHandler {
    void loadConfig(Class<?> configClass);

    String getFileExtension(); // for future registration/use
}
