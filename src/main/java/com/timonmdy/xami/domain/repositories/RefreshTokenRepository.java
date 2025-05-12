package com.timonmdy.xami.domain.repositories;

import com.timonmdy.xami.domain.models.auth.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, String> {
    Optional<RefreshToken> findByToken(String token);

    void deleteByUsername(String username);
}
