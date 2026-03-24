package com.timonmdy.xami.domain.repositories;

import com.timonmdy.xami.domain.models.users.User;
import com.timonmdy.xami.domain.models.users.settings.UserSettingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserSettingRepository
        extends JpaRepository<UserSettingEntity, Long> {

    Optional<UserSettingEntity> findByUserAndKey(User user, String key);

    List<UserSettingEntity> findAllByUser(User user);
}
