package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.Time;
import com.olimpiadas.inscriptionsback.Repositories.TimeRepository;
import com.olimpiadas.inscriptionsback.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TimeServiceImpl implements TimeService {

    private final TimeRepository timeRepository;

    public TimeServiceImpl(TimeRepository timeRepository) {
        this.timeRepository = timeRepository;
    }

    @Override
    public Time save(Time time) {
        return timeRepository.save(time);
    }

    @Override
    public List<Time> findAll() {
        return timeRepository.findAll();
    }

    @Override
    public Time findById(Integer id) {
        return timeRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Time with id " + id + " not found")
        );
    }

    @Override
    public void deleteById(Integer id) {
        timeRepository.deleteById(id);
    }

    @Override
    public Time update(Time time) {
        return timeRepository.save(time);
    }

}
