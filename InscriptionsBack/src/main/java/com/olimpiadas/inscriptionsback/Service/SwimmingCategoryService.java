package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.SwimmingCategory;
import com.olimpiadas.inscriptionsback.Repositories.SwimmingCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SwimmingCategoryService {
    @Autowired
    private SwimmingCategoryRepository categoryRepository;

    public List<SwimmingCategory> getAllCategories() {
        return categoryRepository.findAll();
    }
}

