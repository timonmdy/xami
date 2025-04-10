package com.txmondv.mediainterface.api.dto.users;

import com.txmondv.mediainterface.domain.models.users.UserRole;
import lombok.Data;

@Data
public class ChangeRoleRequest {
    private String username;
    private UserRole role;
}
