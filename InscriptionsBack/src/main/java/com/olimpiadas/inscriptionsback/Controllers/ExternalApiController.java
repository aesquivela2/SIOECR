package com.olimpiadas.inscriptionsback.Controllers;

import com.olimpiadas.inscriptionsback.Service.ExternalApiService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/protected")
public class ExternalApiController {

    private final ExternalApiService externalApiService;

    public ExternalApiController(ExternalApiService externalApiService) {
        this.externalApiService = externalApiService;
    }


}
