package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.Region;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RegionService {
    Region save(Region region);
    List<Region> findAll();
    Region findById(Integer id);
    void deleteById(Integer id);
    Region update(Region region);
}
