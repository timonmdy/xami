package com.timonmdy.xami.api.controller.system;

import com.timonmdy.xami.core.annotations.Roles;
import com.timonmdy.xami.domain.models.system.StatName;
import com.timonmdy.xami.domain.models.users.UserRole;
import com.timonmdy.xami.service.system.StatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/system/stats")
public class StatsController {

    private final StatsService statsService;

    @Roles(UserRole.TECHNICAL)
    @GetMapping("/getSomeNumber")
    public ResponseEntity<Long> getSomeNumber() {
        return ResponseEntity.ok(statsService.getStatValue(StatName.SOME_NUMBER));
    }
}
