package com.olimpiadas.inscriptionsback.Controllers;

import com.olimpiadas.inscriptionsback.Models.Canton;
import com.olimpiadas.inscriptionsback.Service.CantonService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cantons")
@CrossOrigin(origins = "http://localhost:4200")
public class CantonController {

    private final CantonService cantonService;

    public CantonController(CantonService cantonService) {
        this.cantonService = cantonService;
    }

    @GetMapping
    public List<Map<String, Object>> getAllCantons() {
        return cantonService.findAll().stream()
                .map(canton -> {
                    Map<String, Object> cantonData = new HashMap<>();
                    cantonData.put("id", canton.getId());
                    cantonData.put("name", canton.getName());
                    cantonData.put("provinceId", canton.getProvinceId());
                    return cantonData;
                })
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Map<String, Object> getCantonById(@PathVariable Integer id) {
        Canton canton = cantonService.findById(id);
        Map<String, Object> cantonData = new HashMap<>();
        cantonData.put("id", canton.getId());
        cantonData.put("name", canton.getName());
        cantonData.put("provinceId", canton.getProvinceId());
        return cantonData;
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
