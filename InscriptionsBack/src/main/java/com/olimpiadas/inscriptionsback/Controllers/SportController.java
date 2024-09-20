package com.olimpiadas.inscriptionsback.Controllers;

import com.olimpiadas.inscriptionsback.Models.Sport;
import com.olimpiadas.inscriptionsback.Service.SportService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sports")
@CrossOrigin(origins = "http://localhost:4200")
public class SportController {

    private final SportService sportService;

    public SportController(SportService sportService) {
        this.sportService = sportService;
    }

    @PostMapping
    public Sport save(@RequestBody Sport sport) {
        return sportService.save(sport);
    }

    @GetMapping
    public List<Sport> findAll() {
        List<Sport> sports = sportService.findAll();
        for (Sport sport : sports) {
            System.out.println("Sport Type: " + sport.getType());  // Verifica que no sea null
        }
        return sports;
    }

    @GetMapping("/{id}")
    public Sport findById(@PathVariable Integer id) {
        return sportService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Integer id) {
        sportService.deleteById(id);
    }

    @PutMapping("/{id}")
    public Sport updateSport(@PathVariable Integer id, @RequestBody Sport sport) {
        sport.setId(id.longValue());  // Convertimos el Integer a Long
        return sportService.update(sport);
    }

}
