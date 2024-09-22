package com.olimpiadas.inscriptionsback.Controllers;

import com.olimpiadas.inscriptionsback.Models.AvailableDays;
import com.olimpiadas.inscriptionsback.Service.AvailableDayService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/available-days")
@CrossOrigin(origins = "http://localhost:4200")
public class AvailableDayController {

    private final AvailableDayService availableDayService;

    public AvailableDayController(AvailableDayService availableDayService) {
        this.availableDayService = availableDayService;
    }

    @PostMapping
    public AvailableDays save(@RequestBody AvailableDays availableDays) {
        return availableDayService.save(availableDays);
    }

    @GetMapping
    public List<AvailableDays> findAll() {
        return availableDayService.findAll();
    }

    @GetMapping("/{id}")
    public AvailableDays findById(@PathVariable Integer id) {
        return availableDayService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Integer id) {
        availableDayService.deleteById(id);
    }

    @PutMapping("/{id}")
    public AvailableDays updateAvailableDay(@PathVariable Long id, @RequestBody AvailableDays availableDays) {
        availableDays.setId(id);
        return availableDayService.update(availableDays);
    }
}

