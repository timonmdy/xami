package com.txmondv.mediainterface.commands.system;

import com.txmondv.mediainterface.core.annotations.LoggingCommand;
import com.txmondv.mediainterface.core.commands.CommandManager;
import com.txmondv.mediainterface.core.configurations.ConfigManager;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.stereotype.Component;

import static com.txmondv.mediainterface.config.ServerUserConfig.WEBSERVER_PORT;

@ShellComponent
@Component
public class SystemCommands {

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
