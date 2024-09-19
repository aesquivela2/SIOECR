package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.AvailableDay;
import com.olimpiadas.inscriptionsback.Repositories.AvailableDayRepository;
import com.olimpiadas.inscriptionsback.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvailableDayServiceImpl implements AvailableDayService {

    private final AvailableDayRepository availableDayRepository;

    public AvailableDayServiceImpl(AvailableDayRepository availableDayRepository) {
        this.availableDayRepository = availableDayRepository;
    }

    @Override
    public AvailableDay save(AvailableDay availableDay) {
        return availableDayRepository.save(availableDay);
    }

    @Override
    public List<AvailableDay> findAll() {
        return availableDayRepository.findAll();
    }

    @Override
    public AvailableDay findById(Integer id) {
        return availableDayRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("AvailableDay with id " + id + " not found")
        );
    }

    @Override
    public void deleteById(Integer id) {
        availableDayRepository.deleteById(id);
    }

    @Override
    public AvailableDay update(AvailableDay availableDay) {
        return availableDayRepository.save(availableDay);
    }
}
