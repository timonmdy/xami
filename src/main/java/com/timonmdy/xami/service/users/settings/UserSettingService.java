package com.timonmdy.xami.service.users.settings;

import com.timonmdy.xami.domain.models.users.User;
import com.timonmdy.xami.domain.models.users.settings.UserSetting;
import com.timonmdy.xami.domain.models.users.settings.UserSettingEntity;
import com.timonmdy.xami.domain.repositories.UserSettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserSettingService {

    private final UserSettingRepository repo;

    public Optional<Object> find(User user, UserSetting setting) {
        return repo.findByUserAndKey(user, setting.getKey())
                .map(e -> cast(setting, e.getValue()));
    }

    public void set(User user, UserSetting setting, Object value) {
        UserSettingEntity entity = repo.findByUserAndKey(user, setting.getKey())
                .orElseGet(() -> {
                    UserSettingEntity e = new UserSettingEntity();
                    e.setUser(user);
                    e.setKey(setting.getKey());
                    return e;
                });

        entity.setValue(String.valueOf(value));
        repo.save(entity);
    }

    public void reset(User user, UserSetting setting) {
        repo.findByUserAndKey(user, setting.getKey())
                .ifPresent(repo::delete);
    }

    public void resetAll(User user) {
        repo.findAllByUser(user)
                .forEach(repo::delete);
    }

    private Object cast(UserSetting setting, String value) {
        return switch (setting.getType()) {
            case BOOLEAN -> Boolean.parseBoolean(value);
            case NUMBER -> Integer.parseInt(value);
            case STRING -> value;
        };
    }
}
