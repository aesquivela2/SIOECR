package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.Laterality;
import com.olimpiadas.inscriptionsback.Repositories.LateralityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LateralityService {

    private final LateralityRepository lateralityRepository;

    @Autowired
    public LateralityService(LateralityRepository lateralityRepository) {
        this.lateralityRepository = lateralityRepository;
    }

    public List<Laterality> getAllLateralityOptions() {
        return lateralityRepository.findAll();
    }
}
