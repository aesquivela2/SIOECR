package com.olimpiadas.inscriptionsback.Controllers;

import com.olimpiadas.inscriptionsback.Models.EmergencyContact;
import com.olimpiadas.inscriptionsback.Service.EmergencyContactService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emergency-contacts")
@CrossOrigin(origins = "http://localhost:4200")
public class EmergencyContactController {

    private final EmergencyContactService emergencyContactService;

    public EmergencyContactController(EmergencyContactService emergencyContactService) {
        this.emergencyContactService = emergencyContactService;
    }

    @PostMapping
    public EmergencyContact save(@RequestBody EmergencyContact emergencyContact) {
        return emergencyContactService.save(emergencyContact);
    }

    @GetMapping
    public List<EmergencyContact> findAll() {
        return emergencyContactService.findAll();
    }

    @GetMapping("/{id}")
    public EmergencyContact findById(@PathVariable Integer id) {
        return emergencyContactService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Integer id) {
        emergencyContactService.deleteById(id);
    }

    @PutMapping("/{id}")
    public EmergencyContact updateEmergencyContact(@PathVariable Integer id, @RequestBody EmergencyContact emergencyContact) {
        emergencyContact.setId(id);
        return emergencyContactService.update(emergencyContact);
    }
}
