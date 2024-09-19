package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.AvailableDaysTimes;
import com.olimpiadas.inscriptionsback.Repositories.AvailableDaysTimesRepository;
import com.olimpiadas.inscriptionsback.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvailableDaysTimesServiceImpl implements AvailableDaysTimesService {

    private final AvailableDaysTimesRepository availableDaysTimesRepository;

    public AvailableDaysTimesServiceImpl(AvailableDaysTimesRepository availableDaysTimesRepository) {
        this.availableDaysTimesRepository = availableDaysTimesRepository;
    }

    @Override
    public AvailableDaysTimes save(AvailableDaysTimes availableDaysTimes) {
        return availableDaysTimesRepository.save(availableDaysTimes);
    }

    @Override
    public List<AvailableDaysTimes> findAll() {
        return availableDaysTimesRepository.findAll();
    }

    @Override
    public AvailableDaysTimes findById(Integer id) {
        return availableDaysTimesRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("AvailableDaysTimes with id " + id + " not found")
        );
    }

    @Override
    public void deleteById(Integer id) {
        availableDaysTimesRepository.deleteById(id);
    }

    @Override
    public AvailableDaysTimes update(AvailableDaysTimes availableDaysTimes) {
        return availableDaysTimesRepository.save(availableDaysTimes);
    }
}
