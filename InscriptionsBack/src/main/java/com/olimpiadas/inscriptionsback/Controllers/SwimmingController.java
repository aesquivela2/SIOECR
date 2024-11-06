package com.olimpiadas.inscriptionsback.Controllers;

import com.olimpiadas.inscriptionsback.Models.SwimmingCategory;
import com.olimpiadas.inscriptionsback.Service.SwimmingCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/swimming")
@CrossOrigin(origins = "http://localhost:4200")
public class SwimmingController {
    @Autowired
    private SwimmingCategoryService categoryService;

    @GetMapping("/categories")
    public List<SwimmingCategory> getAllCategories() {
        return categoryService.getAllCategories();
    }
}

