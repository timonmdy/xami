package com.txmondv.xami.service.system;

import com.sun.management.OperatingSystemMXBean;
import com.txmondv.xami.api.dto.system.HardwareStats;
import org.springframework.stereotype.Service;

import java.io.File;
import java.lang.management.ManagementFactory;
import java.util.Optional;

@Service
public class ResourceInfoService {

    public Optional<HardwareStats> getHardwareStats() {
        OperatingSystemMXBean osBean = ManagementFactory.getPlatformMXBean(OperatingSystemMXBean.class);
        return Optional.of(new HardwareStats(
                osBean.getProcessCpuLoad() * 100,
                osBean.getTotalMemorySize() / (1024 * 1024),
                osBean.getFreeMemorySize() / (1024 * 1024),
                osBean.getTotalSwapSpaceSize() / (1024 * 1024),
                osBean.getFreeSwapSpaceSize() / (1024 * 1024),
                new File("/").getTotalSpace() / (1024 * 1024),
                new File("/").getFreeSpace() / (1024 * 1024),
                ManagementFactory.getRuntimeMXBean().getUptime()
        ));
    }
}
