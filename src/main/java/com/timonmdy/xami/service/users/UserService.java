package com.timonmdy.xami.service.users;

import com.timonmdy.xami.api.dto.users.UserDto;
import com.timonmdy.xami.core.security.jwt.JwtUtil;
import com.timonmdy.xami.domain.models.users.User;
import com.timonmdy.xami.domain.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public boolean exists(String username) {
        return userRepository.existsByUsernameIgnoreCase(username);
    }

    public Optional<User> getUserByAuthHeader(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) return Optional.empty();

        String token = authHeader.substring(7);
        if (!jwtUtil.validateToken(token)) return Optional.empty();

        String username = jwtUtil.extractUsername(token);
        return getUser(username);
    }

    public Optional<User> getUser(String userName) {
        return userRepository.findByUsernameIgnoreCase(userName);
    }

    public Optional<User> getUser(Long userId) {
        return userRepository.findById(userId);
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserDto(user.getId(), user.getUsername(), user.getRoles()))
                .collect(Collectors.toList());
    }

    public User save(User user) {
        return userRepository.save(user);
    }
}
