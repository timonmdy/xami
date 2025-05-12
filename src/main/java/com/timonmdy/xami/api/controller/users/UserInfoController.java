package com.timonmdy.xami.api.controller.users;

import com.timonmdy.xami.api.dto.users.UserDto;
import com.timonmdy.xami.core.annotations.Authenticated;
import com.timonmdy.xami.core.annotations.Roles;
import com.timonmdy.xami.domain.models.users.User;
import com.timonmdy.xami.domain.models.users.UserRole;
import com.timonmdy.xami.service.users.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users/info")
public class UserInfoController {
    private final UserService userInfoService;

    @Authenticated
    @GetMapping("/self")
    public ResponseEntity<UserDto> getUsername(User user) {
        return ResponseEntity.ok(new UserDto(user));
    }

    @Roles({UserRole.MANAGER})
    @GetMapping("/getUsers")
    public List<UserDto> getUsers() {
        return userInfoService.getAllUsers();
    }
}
