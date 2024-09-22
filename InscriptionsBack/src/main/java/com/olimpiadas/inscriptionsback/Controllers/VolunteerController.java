package com.olimpiadas.inscriptionsback.Controllers;

import com.olimpiadas.inscriptionsback.Models.Volunteer;
import com.olimpiadas.inscriptionsback.Service.VolunteerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/volunteers")
@CrossOrigin(origins = "http://localhost:4200")
public class VolunteerController {

    private final VolunteerService volunteerService;

    public VolunteerController(VolunteerService volunteerService) {
        this.volunteerService = volunteerService;
    }

    @PostMapping
    public void save(@RequestBody Volunteer volunteer) {
        if (volunteer.getName() == null || volunteer.getName().isEmpty()) {
            throw new IllegalArgumentException("El nombre del voluntario es requerido");
        }
        System.out.println("Volunteer received: " + volunteer.getName());
         volunteerService.saveVolunteer(volunteer);
    }


    @GetMapping
    public List<Volunteer> findAll() {
        return volunteerService.findAll();
    }

    @GetMapping("/{id}")
    public Volunteer findById(@PathVariable Integer id) {
        return volunteerService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Integer id) {
        volunteerService.deleteById(id);
    }

    @PutMapping("/{id}")
    public Volunteer updateVolunteer(@PathVariable Integer id, @RequestBody Volunteer volunteer) {
        volunteer.setId(id);
        return volunteerService.update(volunteer);
    }
}
