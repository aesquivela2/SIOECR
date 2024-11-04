package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.GlobalRegion;
import com.olimpiadas.inscriptionsback.Repositories.GlobalRegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class GlobalRegionService {

    private final GlobalRegionRepository globalRegionRepository;

    @Autowired
    public GlobalRegionService(GlobalRegionRepository globalRegionRepository) {
        this.globalRegionRepository = globalRegionRepository;
    }

    public List<GlobalRegion> getAllGlobalRegions() {
        return globalRegionRepository.findAll();
    }
}

