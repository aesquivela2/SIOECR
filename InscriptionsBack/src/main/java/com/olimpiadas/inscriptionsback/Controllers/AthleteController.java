package com.olimpiadas.inscriptionsback.Controllers;

import com.olimpiadas.inscriptionsback.Models.Athlete;
import com.olimpiadas.inscriptionsback.Models.ErrorResponse;
import com.olimpiadas.inscriptionsback.Models.Sport;
import com.olimpiadas.inscriptionsback.Models.SportLevel;
import com.olimpiadas.inscriptionsback.Service.AthleteService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
        public ResponseEntity<?> save(@RequestBody Athlete athlete) {
        athlete.setSportLevel(new SportLevel(1, new Sport(), "xx"));
            // Pre-validation of name
            if (athlete.getName() == null || athlete.getName().isEmpty()) {
                return ResponseEntity.badRequest().body(new ErrorResponse("name", "El nombre del atleta es requerido"));
            }

            try {
                // Try to save athlete using service method
                athleteService.save(athlete); // Let service handle transaction
                return ResponseEntity.ok("Atleta guardado correctamente");
            } catch (DataIntegrityViolationException e) {
                // Handle specific database-related errors
                String errorMessage = athleteService.handlePostgreSQLError(e);
                return ResponseEntity.badRequest().body(new ErrorResponse(athleteService.extractFieldFromError(errorMessage), errorMessage));
            } catch (Exception e) {
                System.out.println(e);
                // General error handling
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("general", e.getMessage()));
            }
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

