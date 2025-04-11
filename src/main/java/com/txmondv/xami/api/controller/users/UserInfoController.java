package com.txmondv.xami.api.controller.users;

import com.txmondv.xami.api.dto.users.UserDto;
import com.txmondv.xami.core.annotations.Authorized;
import com.txmondv.xami.core.annotations.Roles;
import com.txmondv.xami.domain.models.users.User;
import com.txmondv.xami.domain.models.users.UserRole;
import com.txmondv.xami.service.users.UserService;
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

    @Authorized
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
