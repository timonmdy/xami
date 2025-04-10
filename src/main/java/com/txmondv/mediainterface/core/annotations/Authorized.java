package com.txmondv.mediainterface.core.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Marks a method as requiring user authentication.
 * <p>
 * When a method is annotated with {@code @Authorized}, it will be intercepted by an
 * authorization aspect to ensure that the request contains a valid authorization header.
 * If the user is not authenticated, an {@code APIAccessDeniedException}
 * will be thrown.
 * </p>
 * <p>
 * Additionally, if the method has a {@code User} parameter,
 * it will automatically be populated with the authenticated user.
 * </p>
 *
 * <h3>Example Usage:</h3>
 * <pre>{@code
 * @Authorized
 * public void handleRequest(User user) {
 *     // The 'user' parameter is automatically injected
 *     System.out.println("Authenticated user: " + user.getUsername());
 * }
 * }</pre>
 *
 * @see com.txmondv.mediainterface.core.aspects.AuthorizedAspect
 * @see com.txmondv.mediainterface.domain.models.users.User
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Authorized {
}
