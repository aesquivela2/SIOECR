package com.olimpiadas.inscriptionsback.Controllers;

import com.olimpiadas.inscriptionsback.Models.AvailableDay;
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
    public AvailableDay save(@RequestBody AvailableDay availableDay) {
        return availableDayService.save(availableDay);
    }

    @GetMapping
    public List<AvailableDay> findAll() {
        return availableDayService.findAll();
    }

    @GetMapping("/{id}")
    public AvailableDay findById(@PathVariable Integer id) {
        return availableDayService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Integer id) {
        availableDayService.deleteById(id);
    }

    @PutMapping("/{id}")
    public AvailableDay updateAvailableDay(@PathVariable Long id, @RequestBody AvailableDay availableDay) {
        availableDay.setId(id);  // Actualizamos el día disponible
        return availableDayService.update(availableDay);
    }
}

