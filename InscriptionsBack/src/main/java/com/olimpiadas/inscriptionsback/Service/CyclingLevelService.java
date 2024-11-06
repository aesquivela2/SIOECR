package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.CyclingLevel;
import com.olimpiadas.inscriptionsback.Repositories.CyclingLevelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CyclingLevelService {
    @Autowired
    private CyclingLevelRepository levelRepository;

    public List<CyclingLevel> getAllLevels() {
        return levelRepository.findAll();
    }
}

