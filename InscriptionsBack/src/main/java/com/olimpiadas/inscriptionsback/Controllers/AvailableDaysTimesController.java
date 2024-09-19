package com.olimpiadas.inscriptionsback.Controllers;

import com.olimpiadas.inscriptionsback.Models.AvailableDaysTimes;
import com.olimpiadas.inscriptionsback.Service.AvailableDaysTimesService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/available-days-times")
@CrossOrigin(origins = "http://localhost:4200")
public class AvailableDaysTimesController {

    private final AvailableDaysTimesService availableDaysTimesService;

    public AvailableDaysTimesController(AvailableDaysTimesService availableDaysTimesService) {
        this.availableDaysTimesService = availableDaysTimesService;
    }

    @PostMapping
    public AvailableDaysTimes save(@RequestBody AvailableDaysTimes availableDaysTimes) {
        return availableDaysTimesService.save(availableDaysTimes);
    }

    @GetMapping
    public List<AvailableDaysTimes> findAll() {
        return availableDaysTimesService.findAll();
    }

    @GetMapping("/{id}")
    public AvailableDaysTimes findById(@PathVariable Integer id) {
        return availableDaysTimesService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Integer id) {
        availableDaysTimesService.deleteById(id);
    }

    @PutMapping("/{id}")
    public AvailableDaysTimes updateAvailableDaysTimes(@PathVariable Long id, @RequestBody AvailableDaysTimes availableDaysTimes) {
        availableDaysTimes.setId(id);  // Actualizamos los días y horas disponibles
        return availableDaysTimesService.update(availableDaysTimes);
    }
}
