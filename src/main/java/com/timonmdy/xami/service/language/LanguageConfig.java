package com.timonmdy.xami.service.language;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;

@Configuration
public class LanguageConfig {

    public static final String CUSTOM_LANG_DIR_PATH = "config/language";

    @Bean
    public MessageSource messageSource() {
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();

        // Order matters: custom files loaded first (overrides), then base
        messageSource.setBasenames(
                "file:./" + CUSTOM_LANG_DIR_PATH + "/messages_custom",  // custom override file
                "classpath:/i18n/messages"             // base file from resources
        );

        messageSource.setDefaultEncoding("UTF-8");
        messageSource.setFallbackToSystemLocale(false); // prevent locale fallback issues
        messageSource.setCacheSeconds(5);

        return messageSource;
    }
}
