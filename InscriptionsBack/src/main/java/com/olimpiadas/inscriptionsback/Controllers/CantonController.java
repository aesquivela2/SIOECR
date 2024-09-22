package com.olimpiadas.inscriptionsback.Controllers;

import com.olimpiadas.inscriptionsback.Models.Canton;
import com.olimpiadas.inscriptionsback.Service.CantonService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cantons")
@CrossOrigin(origins = "http://localhost:4200")
public class CantonController {

    private final CantonService cantonService;

    public CantonController(CantonService cantonService) {
        this.cantonService = cantonService;
    }

    @GetMapping
    public List<Canton> getAllCantons() {
        return cantonService.findAll();
    }

    @GetMapping("/{id}")
    public Canton getCantonById(@PathVariable Integer id) {
        return cantonService.findById(id);
    }

    @PostMapping
    public Canton createCanton(@RequestBody Canton canton) {
        return cantonService.save(canton);
    }

    @PutMapping("/{id}")
    public Canton updateCanton(@PathVariable Integer id, @RequestBody Canton cantonDetails) {
        Canton canton = cantonService.findById(id);
        canton.setName(cantonDetails.getName());
        canton.setProvince(cantonDetails.getProvince());
        return cantonService.update(canton);
    }

    @DeleteMapping("/{id}")
    public void deleteCanton(@PathVariable Integer id) {
        cantonService.deleteById(id);
    }
}
