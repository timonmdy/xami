package com.timonmdy.xami.domain.models.users.settings;

import com.timonmdy.xami.domain.models.users.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(
        name = "user_settings",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "setting_key"})
)
@Getter
@Setter
public class UserSettingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private User user;

    @Column(name = "setting_key", nullable = false)
    private String key;

    @Column(name = "setting_value", nullable = false)
    private String value;
}
