package com.timonmdy.xami.api.controller.users;

import com.timonmdy.xami.api.dto.users.ChangeRoleRequest;
import com.timonmdy.xami.core.annotations.Authenticated;
import com.timonmdy.xami.core.annotations.Roles;
import com.timonmdy.xami.domain.models.users.User;
import com.timonmdy.xami.domain.models.users.UserRole;
import com.timonmdy.xami.service.users.UserRoleService;
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

    @Authenticated
    @GetMapping
    public Set<UserRole> getRoles(User user) {
        return userRoleService.getRoles(user.getUsername());
    }
}