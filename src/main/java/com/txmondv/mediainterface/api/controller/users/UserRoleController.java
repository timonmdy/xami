package com.txmondv.mediainterface.api.controller.users;

import com.txmondv.mediainterface.api.dto.users.ChangeRoleRequest;
import com.txmondv.mediainterface.core.annotations.Authorized;
import com.txmondv.mediainterface.core.annotations.Roles;
import com.txmondv.mediainterface.domain.models.users.User;
import com.txmondv.mediainterface.domain.models.users.UserRole;
import com.txmondv.mediainterface.service.users.UserRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/users/roles")
@RequiredArgsConstructor
public class UserRoleController {

    private final UserRoleService userRoleService;

    @Roles(UserRole.MANAGER)
    @PostMapping("/add")
    public void addRole(@RequestBody ChangeRoleRequest roleRequest) {
        userRoleService.addRole(roleRequest.getUsername(), roleRequest.getRole());
    }

    @Roles(UserRole.MANAGER)
    @PostMapping("/remove")
    public void removeRole(@RequestBody ChangeRoleRequest roleRequest) {
        userRoleService.removeRole(roleRequest.getUsername(), roleRequest.getRole());
    }

    @Authorized
    @GetMapping
    public Set<UserRole> getRoles(User user) {
        return userRoleService.getRoles(user.getUsername());
    }
}