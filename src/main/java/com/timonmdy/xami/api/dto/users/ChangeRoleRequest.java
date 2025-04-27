package com.timonmdy.xami.api.dto.users;

import com.timonmdy.xami.domain.models.users.UserRole;
import lombok.Data;

@Data
public class ChangeRoleRequest {
    private String username;
    private UserRole role;
}
