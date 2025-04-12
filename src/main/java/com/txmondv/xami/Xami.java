package com.txmondv.xami;

import com.txmondv.xami.context.AppModuleContext;
import com.txmondv.xami.core.configurations.ConfigManager;
import com.txmondv.xami.core.events.DefaultEventBus;
import com.txmondv.xami.core.modules.ModuleLoader;
import com.txmondv.xami.core.modules.ModuleRegistry;
import com.txmondv.xami.core.modules.ModuleWatcher;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

import java.time.LocalDate;
import java.util.Map;

import static com.txmondv.xami.config.ServerUserConfig.WEBSERVER_PORT;

@SpringBootApplication
@EnableAspectJAutoProxy
public class Xami {
    public static final Logger MAIN_LOGGER = LoggerFactory.getLogger(Xami.class);

    @Autowired
    ApplicationContext context;

    private ModuleLoader moduleLoader;

    public static void main(String[] args) {
        String today = LocalDate.now().toString();

        System.setProperty("logging.file.name", "./logs/" + today + ".log");

        SpringApplication app = new SpringApplication(Xami.class);
        ConfigManager.loadAllConfigs();

        int webServerPort = WEBSERVER_PORT.get();
        app.setDefaultProperties(Map.of(
                "server.port", webServerPort
        ));

        app.run(args);
    }

    @PostConstruct
    public void finishConstruction() {
        loadModules();
        MAIN_LOGGER.info("Xami server bound to all interfaces on port {}", WEBSERVER_PORT.get());
    }

    @PreDestroy
    public void beginDestruction() {
        moduleLoader.unloadModules();
    }

    public void loadModules() {
        DefaultEventBus eventBus = new DefaultEventBus();
        ModuleRegistry registry = new ModuleRegistry();
        AppModuleContext moduleContext = new AppModuleContext(eventBus, context, registry);

        moduleLoader = new ModuleLoader(moduleContext);
        moduleLoader.loadModules();

        new Thread(new ModuleWatcher(moduleLoader)).start();
    }
}
