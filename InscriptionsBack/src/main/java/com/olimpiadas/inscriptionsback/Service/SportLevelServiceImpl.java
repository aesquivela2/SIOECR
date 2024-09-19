package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.SportLevel;
import com.olimpiadas.inscriptionsback.Repositories.SportLevelRepository;
import com.olimpiadas.inscriptionsback.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SportLevelServiceImpl implements SportLevelService {

    private final SportLevelRepository sportLevelRepository;

    public SportLevelServiceImpl(SportLevelRepository sportLevelRepository) {
        this.sportLevelRepository = sportLevelRepository;
    }

    @Override
    public SportLevel save(SportLevel sportLevel) {
        return sportLevelRepository.save(sportLevel);
    }

    @Override
    public List<SportLevel> findAll() {
        return sportLevelRepository.findAll();
    }

    @Override
    public SportLevel findById(Integer id) {
        return sportLevelRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Nivel de deporte con id " + id + " no se encuentra")
        );
    }

    @Override
    public void deleteById(Integer id) {
        sportLevelRepository.deleteById(id);
    }

    @Override
    public SportLevel update(SportLevel sportLevel) {
        return sportLevelRepository.save(sportLevel);
    }
}
