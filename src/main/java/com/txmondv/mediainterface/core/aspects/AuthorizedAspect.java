package com.txmondv.mediainterface.core.aspects;

import com.txmondv.mediainterface.core.exceptions.APIAccessDeniedException;
import com.txmondv.mediainterface.domain.models.users.User;
import com.txmondv.mediainterface.service.users.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Objects;
import java.util.Optional;

@Aspect
@Component
@RequiredArgsConstructor
public class AuthorizedAspect {

    private final UserService userInfoService;

    /**
     * Check if the user is authorized to access the resource.
     * If the user is not authorized, an {@code APIAccessDeniedException} will be thrown.
     * This method will be called before the method annotated with {@code @Authorized}.
     *
     * @see com.txmondv.mediainterface.core.annotations.Authorized
     */
    @Around("@annotation(authorized)")
    public Object checkAuthorization(ProceedingJoinPoint joinPoint) throws Throwable {
        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        Optional<User> userOpt = userInfoService.getUserByAuthHeader(authHeader);
        if (userOpt.isEmpty()) {
            throw new APIAccessDeniedException("You have to be logged in to access this resource.");
        }

        User user = userOpt.get();
        Object[] args = joinPoint.getArgs();
        for (int i = 0; i < args.length; i++) {
            if (args[i] instanceof User) {
                args[i] = user;
                break;
            }
        }

        return joinPoint.proceed(args);
    }
}