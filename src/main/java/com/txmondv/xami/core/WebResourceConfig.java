package com.txmondv.xami.core;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web configuration class for routing frontend views and serving static resources.
 * <p>
 * - Forwards all non-API and non-static routes to {@code index.html} to support SPA routing.<br>
 * - Exposes {@code /static/**} paths to serve frontend assets.
 */
@Configuration
public class WebResourceConfig implements WebMvcConfigurer {

    /**
     * Forwards all frontend routes (except API/static/file requests) to {@code index.html}
     * to enable client-side routing in a Single Page Application (SPA).
     *
     * @param registry the {@link ViewControllerRegistry} to register view controllers with
     */
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // Root path
        registry.addViewController("/").setViewName("forward:/index.html");

        // Any path that:
        // - does NOT start with "/api"
        // - does NOT start with "/static"
        // - does NOT include a file extension
        // will be forwarded to index.html for SPA routing.
        registry.addViewController("/{path:^(?!api|static|.*\\..*).*$}/**")
                .setViewName("forward:/index.html");
    }

    /**
     * Maps {@code /static/**} URLs to resources located in {@code classpath:/static/}.
     *
     * @param registry the {@link ResourceHandlerRegistry} to register resource handlers with
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/");
    }
}
