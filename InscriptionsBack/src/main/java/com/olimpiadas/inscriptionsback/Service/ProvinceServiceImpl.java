package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.Province;
import com.olimpiadas.inscriptionsback.Repositories.ProvinceRepository;
import com.olimpiadas.inscriptionsback.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProvinceServiceImpl implements ProvinceService {
    private final ProvinceRepository provinceRepository;

    public ProvinceServiceImpl(ProvinceRepository provinceRepository) {
        this.provinceRepository = provinceRepository;
    }

    @Override
    public Province save(Province province) {
        return provinceRepository.save(province);
    }

    @Override
    public List<Province> findAll() {
        return provinceRepository.findAll();
    }

    @Override
    public Province findById(Integer id) {
        Province province = provinceRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Provincia con id " + id + " no se encuentra")
        );
        return province;
    }

    @Override
    public void deleteById(Integer id) {
        provinceRepository.deleteById(id);
    }

    @Override
    public Province update(Province province) {
        return provinceRepository.save(province);
    }
}
