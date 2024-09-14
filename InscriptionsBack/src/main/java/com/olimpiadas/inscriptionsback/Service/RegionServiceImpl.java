package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.Region;
import com.olimpiadas.inscriptionsback.Repositories.RegionRepository;
import com.olimpiadas.inscriptionsback.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegionServiceImpl implements RegionService {
    private final RegionRepository regionRepository;

    public RegionServiceImpl(RegionRepository regionRepository) {
        this.regionRepository = regionRepository;
    }

    @Override
    public Region save(Region region) {
        return regionRepository.save(region);
    }

    @Override
    public List<Region> findAll() {
        return regionRepository.findAll();
    }

    @Override
    public Region findById(Integer id) {
        Region region = regionRepository.findById(id).orElseThrow(
                () -> {
                    throw new ResourceNotFoundException("Región con id " + id + " no se encuentra");
                }
        );
        return region;
    }

    @Override
    public void deleteById(Integer id) {
        regionRepository.deleteById(id);
    }

    @Override
    public Region update(Region region) {
        return regionRepository.save(region);
    }
}
