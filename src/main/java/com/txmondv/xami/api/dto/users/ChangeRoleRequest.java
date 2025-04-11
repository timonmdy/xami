package com.txmondv.xami.api.dto.users;

import com.txmondv.xami.domain.models.users.UserRole;
import lombok.Data;

@Data
public class ChangeRoleRequest {
    private String username;
    private UserRole role;
}
