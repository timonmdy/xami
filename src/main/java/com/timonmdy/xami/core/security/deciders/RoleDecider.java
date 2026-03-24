package com.timonmdy.xami.core.security.deciders;

import com.timonmdy.xami.domain.models.users.UserRole;
import com.timonmdy.xami.service.auth.AuthHeaderService;
import jakarta.servlet.http.Cookie;
import org.jspecify.annotations.Nullable;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.authorization.AuthorizationResult;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;

import java.util.Arrays;
import java.util.Optional;
import java.util.function.Supplier;

public class RoleDecider implements AuthorizationManager<RequestAuthorizationContext> {

    private static final String ACCESS_TOKEN_COOKIE_NAME = "accessToken";
    private final AuthHeaderService authHeaderService;
    private final UserRole requiredRole;

    public RoleDecider(AuthHeaderService authHeaderService, UserRole requiredRole) {
        this.authHeaderService = authHeaderService;
        this.requiredRole = requiredRole;
    }

    @Override
    public @Nullable AuthorizationResult authorize(Supplier<? extends @Nullable Authentication> authentication, RequestAuthorizationContext ctx) {
        if (ctx == null) {
            return () -> false;
        }

        var req = ctx.getRequest();

        Optional<String> token = Optional.ofNullable(req.getCookies())
                .stream()
                .flatMap(Arrays::stream)
                .filter(c -> ACCESS_TOKEN_COOKIE_NAME.equals(c.getName()))
                .map(Cookie::getValue)
                .findFirst();

        if (token.isEmpty()) {
            req.setAttribute("AUTH_STATUS", "UNAUTHENTICATED");
            return () -> false;
        }

        var user = authHeaderService.extractUserFromAccessToken(token.get())
                .filter(u -> u.hasRole(requiredRole));

        if (user.isEmpty()) {
            req.setAttribute("AUTH_STATUS", "FORBIDDEN");
            return () -> false;
        }

        return () -> true;
    }
}
