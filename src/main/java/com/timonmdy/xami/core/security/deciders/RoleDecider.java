package com.timonmdy.xami.core.security.deciders;

import com.timonmdy.xami.domain.models.users.User;
import com.timonmdy.xami.domain.models.users.UserRole;
import com.timonmdy.xami.service.auth.AuthHeaderService;
import jakarta.servlet.http.Cookie;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
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
    public AuthorizationDecision check(Supplier<Authentication> authentication, RequestAuthorizationContext context) {
        Optional<String> accessToken = Optional.ofNullable(context.getRequest().getCookies()).stream()
                .flatMap(Arrays::stream)
                .filter(c -> ACCESS_TOKEN_COOKIE_NAME.equals(c.getName()))
                .map(Cookie::getValue)
                .findFirst();

        if (accessToken.isEmpty()) {
            context.getRequest().setAttribute("AUTH_STATUS", "UNAUTHENTICATED");
            return new AuthorizationDecision(false);
        }

        Optional<User> userOpt = authHeaderService.extractUserFromAccessToken(accessToken.get());

        if (userOpt.isEmpty() || !userOpt.get().hasRole(requiredRole)) {
            context.getRequest().setAttribute("AUTH_STATUS", "FORBIDDEN");
            return new AuthorizationDecision(false);
        }

        return new AuthorizationDecision(true);
    }
}
