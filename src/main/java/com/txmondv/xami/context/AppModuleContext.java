package com.txmondv.xami.context;

import com.txmondv.xami.core.events.EventBus;
import com.txmondv.xami.core.modules.ModuleContext;
import com.txmondv.xami.core.modules.ModuleRegistry;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.context.ApplicationContext;

@AllArgsConstructor
public class AppModuleContext implements ModuleContext {
    private final EventBus eventBus;
    @Getter
    private final ApplicationContext spring;
    @Getter
    private final ModuleRegistry moduleRegistry;
}
