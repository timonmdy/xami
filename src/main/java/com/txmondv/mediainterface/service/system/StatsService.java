package com.txmondv.mediainterface.service.system;

import com.txmondv.mediainterface.domain.models.system.StatName;
import com.txmondv.mediainterface.domain.models.system.Stats;
import com.txmondv.mediainterface.domain.repositories.StatsRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StatsService {

    private final StatsRepository statsRepository;

    @Transactional
    public void incrementStat(StatName name) {
        Stats stat = statsRepository.findByName(name.getName())
                .orElseGet(() -> {
                    Stats newStat = new Stats();
                    newStat.setName(name.getName());
                    newStat.setStatValue(0L);
                    return newStat;
                });
        stat.setStatValue(stat.getStatValue() + 1);
        statsRepository.save(stat);
    }

    public Long getStatValue(StatName name) {
        return statsRepository.findByName(name.getName())
                .map(Stats::getStatValue)
                .orElse(0L);
    }
}