package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.Canton;
import com.olimpiadas.inscriptionsback.Repositories.CantonRepository;
import com.olimpiadas.inscriptionsback.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CantonServiceImpl implements CantonService {
    private final CantonRepository cantonRepository;

    public CantonServiceImpl(CantonRepository cantonRepository) {
        this.cantonRepository = cantonRepository;
    }

    @Override
    public Canton save(Canton canton) {
        return cantonRepository.save(canton);
    }

    @Override
    public List<Canton> findAll() {
        return cantonRepository.findAll();
    }

    @Override
    public Canton findById(Integer id) {
        Canton canton = cantonRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Cantón con id " + id + " no se encuentra")
        );
        return canton;
    }

    @Override
    public void deleteById(Integer id) {
        cantonRepository.deleteById(id);
    }

    @Override
    public Canton update(Canton canton) {
        return cantonRepository.save(canton);
    }
}
