package com.txmondv.mediainterface.commands.api;

import com.txmondv.mediainterface.core.annotations.LoggingCommand;
import com.txmondv.mediainterface.core.commands.CommandManager;
import lombok.AllArgsConstructor;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.shell.standard.ShellOption;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.util.Comparator;
import java.util.Set;

@ShellComponent
@AllArgsConstructor
public class APICommands {

    private final RequestMappingHandlerMapping mapping;

    @LoggingCommand
    @ShellMethod("Prints registered API routes, sorted by path")
    public void routes(@ShellOption(defaultValue = ShellOption.NULL) String path) {
        // Minimaler Abstand zwischen Methode und Pfad
        int MIN_ROUTE_LENGTH = 10;
        // Pfade, welche nicht als Route geloggt werden
        Set<String> excluded = Set.of("/error");

        mapping.getHandlerMethods().keySet().stream()
                .flatMap(info -> {
                    var paths = info.getPathPatternsCondition() != null
                            ? info.getPathPatternsCondition().getPatternValues()
                            : info.getDirectPaths();
                    var method = info.getMethodsCondition().toString();
                    return paths.stream()
                            .filter(p -> !excluded.contains(p) && (path == null || p.startsWith(path)))
                            .map(p -> String.format("%-" + MIN_ROUTE_LENGTH + "s %s", method, p));
                })
                .sorted(Comparator.comparing(s -> s.substring(MIN_ROUTE_LENGTH)))
                .forEach(r -> CommandManager.logResult("Route", r));
    }
}
