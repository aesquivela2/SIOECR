package com.olimpiadas.inscriptionsback.Controllers;

import com.olimpiadas.inscriptionsback.Models.DisabilityType;
import com.olimpiadas.inscriptionsback.Service.DisabilityTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") // Permite solicitudes desde Angular
public class DisabilityTypeController {

    @Autowired
    private DisabilityTypeService disabilityTypeService;

    @GetMapping("/disability-types")
    public List<DisabilityType> getDisabilityTypes() {
        return disabilityTypeService.getAllDisabilityTypes();
    }
}

