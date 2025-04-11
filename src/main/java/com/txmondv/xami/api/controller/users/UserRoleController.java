package com.txmondv.xami.api.controller.users;

import com.txmondv.xami.api.dto.users.ChangeRoleRequest;
import com.txmondv.xami.core.annotations.Authorized;
import com.txmondv.xami.core.annotations.Roles;
import com.txmondv.xami.domain.models.users.User;
import com.txmondv.xami.domain.models.users.UserRole;
import com.txmondv.xami.service.users.UserRoleService;
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