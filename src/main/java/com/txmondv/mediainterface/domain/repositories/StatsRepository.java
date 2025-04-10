package com.txmondv.mediainterface.domain.repositories;

import com.txmondv.mediainterface.domain.models.system.Stats;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StatsRepository extends JpaRepository<Stats, Long> {
    Optional<Stats> findByName(String name);
}