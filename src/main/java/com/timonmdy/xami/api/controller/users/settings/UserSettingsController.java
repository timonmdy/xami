package com.timonmdy.xami.api.controller.users.settings;

import com.timonmdy.xami.api.dto.users.settings.SettingValueResponse;
import com.timonmdy.xami.api.dto.users.settings.UpdateSettingRequest;
import com.timonmdy.xami.core.annotations.Authenticated;
import com.timonmdy.xami.domain.models.users.User;
import com.timonmdy.xami.domain.models.users.settings.UserSetting;
import com.timonmdy.xami.service.users.settings.UserSettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users/settings")
public class UserSettingsController {

    private final UserSettingService userSettingsService;

    @Authenticated
    @GetMapping("/{settingName}")
    public ResponseEntity<SettingValueResponse> read(
            User user,
            @PathVariable String settingName
    ) {
        UserSetting setting;
        try {
            setting = UserSetting.fromKey(settingName);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }

        return userSettingsService.find(user, setting)
                .map(v -> ResponseEntity.ok(
                        new SettingValueResponse(settingName, v, true)
                ))
                .orElseGet(() -> ResponseEntity.ok(
                        new SettingValueResponse(settingName, setting.getDefaultValue(), false)
                ));
    }

    @Authenticated
    @PutMapping("/{settingName}")
    public ResponseEntity<Void> update(
            User user,
            @PathVariable String settingName,
            @RequestBody UpdateSettingRequest body
    ) {
        UserSetting setting;
        try {
            setting = UserSetting.fromKey(settingName);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }

        userSettingsService.set(user, setting, body.getValue());
        return ResponseEntity.ok().build();
    }

    @Authenticated
    @DeleteMapping("/{settingName}")
    public ResponseEntity<Void> reset(
            User user,
            @PathVariable String settingName
    ) {
        UserSetting setting;
        try {
            setting = UserSetting.fromKey(settingName);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }

        userSettingsService.reset(user, setting);
        return ResponseEntity.ok().build();
    }

    @Authenticated
    @DeleteMapping
    public ResponseEntity<Void> resetAll(User user) {
        userSettingsService.resetAll(user);
        return ResponseEntity.ok().build();
    }
}
