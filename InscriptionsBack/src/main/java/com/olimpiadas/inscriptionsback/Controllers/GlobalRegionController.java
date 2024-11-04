package com.olimpiadas.inscriptionsback.Controllers;

import com.olimpiadas.inscriptionsback.Models.GlobalRegion;
import com.olimpiadas.inscriptionsback.Service.GlobalRegionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/global-regions")
@CrossOrigin(origins = "http://localhost:4200")
public class GlobalRegionController {

    private final GlobalRegionService globalRegionService;

    @Autowired
    public GlobalRegionController(GlobalRegionService globalRegionService) {
        this.globalRegionService = globalRegionService;
    }

    @GetMapping
    public List<GlobalRegion> getGlobalRegions() {
        return globalRegionService.getAllGlobalRegions();
    }
}
