package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.CyclingEvent;
import com.olimpiadas.inscriptionsback.Repositories.CyclingEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CyclingEventService {
    @Autowired
    private CyclingEventRepository eventRepository;

    public List<CyclingEvent> getAllEvents() {
        return eventRepository.findAll();
    }
}

