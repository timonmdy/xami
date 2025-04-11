package com.txmondv.xami.api.dto.users;

import com.txmondv.xami.domain.models.users.User;
import com.txmondv.xami.domain.models.users.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
public class UserDto {
    private Long userId;
    private String username;
    private Set<UserRole> roles;

    public UserDto(User user) {
        this.userId = user.getId();
        this.username = user.getUsername();
        this.roles = user.getRoles();
    }
}