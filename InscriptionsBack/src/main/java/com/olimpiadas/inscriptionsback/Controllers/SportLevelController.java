package com.olimpiadas.inscriptionsback.Controllers;

import com.olimpiadas.inscriptionsback.Models.SportLevel;
import com.olimpiadas.inscriptionsback.Service.SportLevelService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sport-levels")
@CrossOrigin(origins = "http://localhost:4200")
public class SportLevelController {

    private final SportLevelService sportLevelService;

    public SportLevelController(SportLevelService sportLevelService) {
        this.sportLevelService = sportLevelService;
    }

    @PostMapping
    public SportLevel save(@RequestBody SportLevel sportLevel) {
        return sportLevelService.save(sportLevel);
    }

    @GetMapping
    public List<SportLevel> findAll() {
        return sportLevelService.findAll();
    }

    @GetMapping("/{id}")
    public SportLevel findById(@PathVariable Integer id) {
        return sportLevelService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Integer id) {
        sportLevelService.deleteById(id);
    }

    @PutMapping("/{id}")
    public SportLevel updateSportLevel(@PathVariable Integer id, @RequestBody SportLevel sportLevel) {
        sportLevel.setId(id);
        return sportLevelService.update(sportLevel);
    }
}
