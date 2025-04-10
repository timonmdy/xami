package com.txmondv.mediainterface;

import com.txmondv.mediainterface.core.configurations.ConfigManager;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

import java.time.LocalDate;
import java.util.Collections;

import static com.txmondv.mediainterface.config.ServerUserConfig.WEBSERVER_PORT;

@SpringBootApplication
@EnableAspectJAutoProxy
public class Chatbot {
    public static final Logger MAIN_LOGGER = LoggerFactory.getLogger(Chatbot.class);

    public static void main(String[] args) {
        String today = LocalDate.now().toString();

        SpringApplication app = new SpringApplication(Chatbot.class);
        ConfigManager.loadAllConfigs();

        int webServerPort = WEBSERVER_PORT.get();
        app.setDefaultProperties(Collections.singletonMap("server.port", webServerPort));
        app.setDefaultProperties(Collections.singletonMap("logging.file.name", "./logs/" + today + ".log"));

        app.run(args);
    }

    @PostConstruct
    public void finishConstruction() {
        MAIN_LOGGER.info("Chatbot server bound to all interfaces on port {}", WEBSERVER_PORT.get());
    }
}
