package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.Athlete;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public interface AthleteService {
    Athlete save(Athlete athlete);
    List<Athlete> findAll();
    Athlete findById(Integer id);
    void deleteById(Integer id);
    Athlete update(Athlete athlete);
}
