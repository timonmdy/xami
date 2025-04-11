package com.txmondv.xami;

import com.txmondv.xami.core.configurations.ConfigManager;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

import java.time.LocalDate;
import java.util.Map;

import static com.txmondv.xami.config.ServerUserConfig.WEBSERVER_PORT;

@SpringBootApplication
@EnableAspectJAutoProxy
public class Xami {
    public static final Logger MAIN_LOGGER = LoggerFactory.getLogger(Xami.class);

    public static void main(String[] args) {
        String today = LocalDate.now().toString();

        SpringApplication app = new SpringApplication(Xami.class);
        ConfigManager.loadAllConfigs();

        int webServerPort = WEBSERVER_PORT.get();
        app.setDefaultProperties(Map.of(
                "server.port", webServerPort,
                "logging.file.name", "./logs/" + today + ".log"
        ));

        app.run(args);
    }

    @PostConstruct
    public void finishConstruction() {
        MAIN_LOGGER.info("Chatbot server bound to all interfaces on port {}", WEBSERVER_PORT.get());
    }
}
