package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.Athlete;
import com.olimpiadas.inscriptionsback.Repositories.AthleteRepository;
import com.olimpiadas.inscriptionsback.exception.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional

public class AthleteServiceImpl implements AthleteService {

    private final AthleteRepository athleteRepository;

    public AthleteServiceImpl(AthleteRepository athleteRepository) {
        this.athleteRepository = athleteRepository;
    }

    @Override
    public void save(Athlete athlete) {
        athleteRepository.saveAthlete(athlete);
    }

    @Override
    public List<Athlete> findAll() {
        return athleteRepository.findAll();
    }

    @Override
    public Athlete findById(Integer id) {
        return athleteRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Atleta con id " + id + " no se encuentra")
        );
    }

    @Override
    public void deleteById(Integer id) {
        athleteRepository.deleteById(id);
    }

    @Override
    public Athlete update(Athlete athlete) {
        return athleteRepository.save(athlete);
    }
}
