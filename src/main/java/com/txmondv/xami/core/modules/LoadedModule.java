package com.txmondv.xami.core.modules;

import java.io.File;
import java.net.URLClassLoader;
import java.util.Optional;

public record LoadedModule(File file, Module module, URLClassLoader classLoader, Optional<ModuleMetadata> metadata) {
}
