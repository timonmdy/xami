package com.txmondv.xami.core.modules;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.txmondv.xami.context.AppModuleContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.InputStream;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.ServiceLoader;
import java.util.jar.JarFile;
import java.util.zip.ZipEntry;


public class ModuleLoader {
    public final Logger LOGGER = LoggerFactory.getLogger(ModuleLoader.class);

    private final File moduleDir = new File("./modules");
    private final AppModuleContext context;
    private final List<LoadedModule> loaded = new ArrayList<>();

    public ModuleLoader(AppModuleContext context) {
        this.context = context;
    }

    public void loadModules() {
        if (!moduleDir.exists()) moduleDir.mkdirs();
        File[] jars = moduleDir.listFiles(f -> f.getName().endsWith(".jar"));

        if (jars == null) {
            LOGGER.info("No modules found.");
            return;
        } else {
            LOGGER.info("Found {} modules.", jars.length);
        }

        for (File jar : jars) {
            try {
                loadModule(jar);
            } catch (Exception e) {
                LOGGER.error("Failed to load module: {}", jar.getName(), e);
            }
        }
    }

    public void unloadModules() {
        for (LoadedModule lm : loaded) {
            try {
                lm.module().onUnload();
                lm.classLoader().close();
            } catch (Exception e) {
                LOGGER.error("Failed to unload module: {}", lm.file().getName(), e);
            }
        }
        loaded.clear();
    }

    private void loadModule(File jarFile) throws Exception {
        URLClassLoader cl = new URLClassLoader(
                new URL[]{jarFile.toURI().toURL()},
                this.getClass().getClassLoader()
        );

        ServiceLoader<Module> serviceLoader = ServiceLoader.load(Module.class, cl);
        if (!serviceLoader.iterator().hasNext()) {
            LOGGER.warn("No module found in {}. Make sure to create a service provider file under '/resources/META-INF/services/'", jarFile.getName());
            return;
        }
        for (Module module : serviceLoader) {
            Optional<ModuleMetadata> metadataOpt = readMetadata(jarFile);
            if (metadataOpt.isPresent()) {
                ModuleMetadata metadata = metadataOpt.get();
                LOGGER.info("Loading module: '{}' v{}", metadata.name(), metadata.version());
            }

            module.onLoad(context);
            loaded.add(new LoadedModule(jarFile, module, cl, metadataOpt));
        }
    }

    private Optional<ModuleMetadata> readMetadata(File jarFile) {
        try (JarFile jar = new JarFile(jarFile)) {
            ZipEntry entry = jar.getEntry("module.json");
            if (entry == null) {
                LOGGER.warn("module.json not found in {}", jarFile.getName());
                return Optional.empty();
            }

            try (InputStream is = jar.getInputStream(entry)) {
                return Optional.ofNullable(new ObjectMapper().readValue(is, ModuleMetadata.class));
            }
        } catch (Exception e) {
            LOGGER.error("Internal error while trying to read module.json from {}", jarFile.getName(), e);
            return Optional.empty();
        }
    }
}
