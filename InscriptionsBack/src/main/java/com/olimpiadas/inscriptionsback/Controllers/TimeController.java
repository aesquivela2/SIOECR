package com.olimpiadas.inscriptionsback.Controllers;

import com.olimpiadas.inscriptionsback.Models.Time;
import com.olimpiadas.inscriptionsback.Service.TimeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/time")
@CrossOrigin(origins = "http://localhost:4200")
public class TimeController {

    private final TimeService timeService;

    public TimeController(TimeService timeService) {
        this.timeService = timeService;
    }

    @PostMapping
    public Time save(@RequestBody Time time) {
        return timeService.save(time);
    }

    @GetMapping
    public List<Time> findAll() {
        return timeService.findAll();
    }

    @GetMapping("/{id}")
    public Time findById(@PathVariable Integer id) {
        return timeService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Integer id) {
        timeService.deleteById(id);
    }

    @PutMapping("/{id}")
    public Time updateTime(@PathVariable Long id, @RequestBody Time time) {
        time.setId(id);
        return timeService.update(time);
    }
}
