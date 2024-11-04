package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.DisabilityType;
import com.olimpiadas.inscriptionsback.Repositories.DisabilityTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DisabilityTypeService {

    @Autowired
    private DisabilityTypeRepository disabilityTypeRepository;

    public List<DisabilityType> getAllDisabilityTypes() {
        return disabilityTypeRepository.findAll();
    }
}

