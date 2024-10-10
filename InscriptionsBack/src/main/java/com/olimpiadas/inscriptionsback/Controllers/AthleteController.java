package com.olimpiadas.inscriptionsback.Controllers;

import com.olimpiadas.inscriptionsback.Models.Athlete;
import com.olimpiadas.inscriptionsback.Service.AthleteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/athletes")
@CrossOrigin(origins = "http://localhost:4200")
public class AthleteController {

    private final AthleteService athleteService;

    public AthleteController(AthleteService athleteService) {
        this.athleteService = athleteService;
    }

    @PostMapping
    public void save(@RequestBody Athlete athlete) {
        if (athlete.getName() == null || athlete.getName().isEmpty()) {
            throw new IllegalArgumentException("El nombre del atleta es requerido");
        }
        System.out.println("Athlete received: " + athlete.getName());

        athleteService.save(athlete);
    }

    @GetMapping
    public List<Athlete> findAll() {
        return athleteService.findAll();
    }

    @GetMapping("/{id}")
    public Athlete findById(@PathVariable Integer id) {
        return athleteService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Integer id) {
        athleteService.deleteById(id);
    }

    @PutMapping("/{id}")
    public Athlete updateAthlete(@PathVariable Integer id, @RequestBody Athlete athlete) {
        athlete.setId(id);
        return athleteService.update(athlete);
    }
}

