package com.timonmdy.xami.api.dto.auth;

import lombok.Data;

@Data
public class AuthRequest {
    private String username;
    private String password;
}
