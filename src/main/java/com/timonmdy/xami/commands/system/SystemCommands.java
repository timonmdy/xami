package com.timonmdy.xami.commands.system;

import com.timonmdy.xami.core.annotations.LoggingCommand;
import com.timonmdy.xami.core.commands.CommandManager;
import com.timonmdy.xami.core.configurations.ConfigManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.info.BuildProperties;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.stereotype.Component;

import static com.timonmdy.xami.config.ServerUserConfig.WEBSERVER_PORT;

@ShellComponent
@Component
public class SystemCommands {

    @Autowired
    private BuildProperties buildProperties;

    @LoggingCommand
    @ShellMethod("Prints the current version of the server")
    public void version() {
        CommandManager.logResult("Version",
                String.format("\nApp: %s\nVersion: %s\nBuilt: %s",
                        buildProperties.getName(),
                        buildProperties.getVersion(),
                        buildProperties.getTime())
        );
    }

    @LoggingCommand
    @ShellMethod("Prints the port the server is running on")
    public void port() {
        CommandManager.logResult("Port", WEBSERVER_PORT.get().toString());
    }

    @LoggingCommand
    @ShellMethod("Reloads configuration files. Attention: Some changes may not be applied until the server is restarted.")
    public void reload() {
        ConfigManager.loadAllConfigs();
        CommandManager.logResult("reloadConfig", "Reloaded all configuration files");
    }

    @LoggingCommand
    @ShellMethod("Stops the server")
    public void stop() {
        System.exit(0);
    }
}
