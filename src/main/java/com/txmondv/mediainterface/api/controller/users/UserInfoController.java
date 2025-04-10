package com.txmondv.mediainterface.api.controller.users;

import com.txmondv.mediainterface.api.dto.users.UserDto;
import com.txmondv.mediainterface.core.annotations.Authorized;
import com.txmondv.mediainterface.core.annotations.Roles;
import com.txmondv.mediainterface.domain.models.users.User;
import com.txmondv.mediainterface.domain.models.users.UserRole;
import com.txmondv.mediainterface.service.users.UserService;
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

    @Authorized
    @Roles({UserRole.MANAGER})
    @GetMapping("/getUsers")
    public List<UserDto> getUsers() {
        return userInfoService.getAllUsers();
    }
}
