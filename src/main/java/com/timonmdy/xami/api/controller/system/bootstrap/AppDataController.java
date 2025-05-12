package com.timonmdy.xami.api.controller.system.bootstrap;

import com.timonmdy.xami.api.dto.system.bootstrap.AppData;
import com.timonmdy.xami.service.system.bootstrap.AppDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class AppDataController {

    private final AppDataService appDataService;

    @GetMapping("/api/system/getAppData")
    public ResponseEntity<AppData> getHardwareStats() {
        return ResponseEntity.ok(appDataService.getAppData());
    }
}
