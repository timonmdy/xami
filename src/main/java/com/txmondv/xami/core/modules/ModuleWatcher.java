package com.txmondv.xami.core.modules;

import java.io.IOException;
import java.nio.file.*;

public class ModuleWatcher implements Runnable {
    private final ModuleLoader loader;
    private final Path modulesPath = Path.of("./modules");

    public ModuleWatcher(ModuleLoader loader) {
        this.loader = loader;
    }

    @Override
    public void run() {
        try {
            WatchService watcher = FileSystems.getDefault().newWatchService();
            modulesPath.register(watcher, StandardWatchEventKinds.ENTRY_CREATE, StandardWatchEventKinds.ENTRY_MODIFY);

            while (true) {
                WatchKey key = watcher.take();
                for (WatchEvent<?> event : key.pollEvents()) {
                    if (event.context().toString().endsWith(".jar")) {
                        System.out.println("[Watcher] Module change detected: " + event.kind().name());
                        loader.unloadModules();
                        loader.loadModules();
                    }
                }
                key.reset();
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
