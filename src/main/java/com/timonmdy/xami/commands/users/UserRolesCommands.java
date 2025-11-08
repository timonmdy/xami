package com.timonmdy.xami.commands.users;

import com.timonmdy.xami.domain.models.users.User;
import com.timonmdy.xami.domain.models.users.UserRole;
import com.timonmdy.xami.domain.repositories.UserRepository;
import com.timonmdy.xami.service.users.UserRoleService;
import lombok.AllArgsConstructor;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;

import java.util.Optional;

@ShellComponent
@AllArgsConstructor
public class UserRolesCommands {

    private final UserRoleService userRoleService;
    private final UserRepository userRepository;

    @ShellMethod("Add a role to a user")
    public String addRole(String username, String roleName) {
        Optional<User> optionalUser = userRepository.findByUsernameIgnoreCase(username);
        if (optionalUser.isEmpty()) {
            return "User not found: " + username;
        }

        try {
            UserRole role = UserRole.valueOf(roleName);
            userRoleService.addRole(username, role);
        } catch (IllegalArgumentException e) {
            return "Invalid role: " + roleName;
        }

        return "Role added successfully.";
    }

    @ShellMethod("Remove a role from a user")
    public String removeRole(String username, String roleName) {
        Optional<User> optionalUser = userRepository.findByUsernameIgnoreCase(username);
        if (optionalUser.isEmpty()) {
            return "User not found: " + username;
        }

        try {
            UserRole role = UserRole.valueOf(roleName);
            userRoleService.removeRole(username, role);
        } catch (IllegalArgumentException e) {
            return "Invalid role: " + roleName;
        }

        return "Role removed successfully.";
    }

}
