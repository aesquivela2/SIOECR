package com.olimpiadas.inscriptionsback.Controllers;

import com.olimpiadas.inscriptionsback.Models.CyclingEvent;
import com.olimpiadas.inscriptionsback.Models.CyclingLevel;
import com.olimpiadas.inscriptionsback.Service.CyclingEventService;
import com.olimpiadas.inscriptionsback.Service.CyclingLevelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/cycling")
@CrossOrigin(origins = "http://localhost:4200")
public class CyclingController {
    @Autowired
    private CyclingLevelService levelService;

    @Autowired
    private CyclingEventService eventService;

    @GetMapping("/levels")
    public List<CyclingLevel> getAllLevels() {
        return levelService.getAllLevels();
    }

    @GetMapping("/events")
    public List<CyclingEvent> getAllEvents() {
        return eventService.getAllEvents();
    }
}

