package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.SportLevel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SportLevelService {
    SportLevel save(SportLevel sportLevel);
    List<SportLevel> findAll();
    SportLevel findById(Integer id);
    void deleteById(Integer id);
    SportLevel update(SportLevel sportLevel);
}
