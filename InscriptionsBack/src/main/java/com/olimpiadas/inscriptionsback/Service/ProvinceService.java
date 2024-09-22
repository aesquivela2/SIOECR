package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.Province;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProvinceService {
    Province save(Province province);
    List<Province> findAll();
    Province findById(Integer id);
    void deleteById(Integer id);
    Province update(Province province);
}
