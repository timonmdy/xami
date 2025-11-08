package com.timonmdy.xami.core.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * Custom entry point for handling unauthorized access attempts.
 * <p>
 * Sends a 401 Unauthorized HTTP response when authentication is required
 * but missing or invalid.
 */
@Component
public class LoginEntryPoint implements AuthenticationEntryPoint {

    /**
     * Handles unauthorized requests by sending a 401 Unauthorized response.
     *
     * @param request       the incoming HTTP request
     * @param response      the HTTP response to modify
     * @param authException the exception that caused the authentication failure
     * @throws IOException if an input or output exception occurs
     */
    @Override
    public void commence(@NonNull HttpServletRequest request,
                         @NonNull HttpServletResponse response,
                         @NonNull AuthenticationException authException) throws IOException {

        String status = (String) request.getAttribute("AUTH_STATUS");

        if ("UNAUTHENTICATED".equals(status)) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication required"); // 401
        } else if ("FORBIDDEN".equals(status)) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Access denied"); // 403
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication required");
        }
    }
}
