package com.olimpiadas.inscriptionsback.Controllers;

import com.olimpiadas.inscriptionsback.Models.VolunteerAvailableDays;
import com.olimpiadas.inscriptionsback.Service.VolunteerAvailableDaysService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/volunteer-available-days")
@CrossOrigin(origins = "http://localhost:4200")
public class VolunteerAvailableDaysController {

    private final VolunteerAvailableDaysService volunteerAvailableDaysService;

    public VolunteerAvailableDaysController(VolunteerAvailableDaysService volunteerAvailableDaysService) {
        this.volunteerAvailableDaysService = volunteerAvailableDaysService;
    }

    @PostMapping
    public VolunteerAvailableDays save(@RequestBody VolunteerAvailableDays volunteerAvailableDays) {
        return volunteerAvailableDaysService.save(volunteerAvailableDays);
    }

    @GetMapping
    public List<VolunteerAvailableDays> findAll() {
        return volunteerAvailableDaysService.findAll();
    }

    @GetMapping("/{id}")
    public VolunteerAvailableDays findById(@PathVariable Integer id) {
        return volunteerAvailableDaysService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Integer id) {
        volunteerAvailableDaysService.deleteById(id);
    }

    @PutMapping("/{id}")
    public VolunteerAvailableDays updateVolunteerAvailableDays(@PathVariable Long id, @RequestBody VolunteerAvailableDays volunteerAvailableDays) {
        volunteerAvailableDays.setId(id);
        return volunteerAvailableDaysService.update(volunteerAvailableDays);
    }

}
