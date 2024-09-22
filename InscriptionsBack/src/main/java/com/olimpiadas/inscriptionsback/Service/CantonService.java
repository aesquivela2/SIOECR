package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.Canton;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CantonService {
    Canton save(Canton canton);
    List<Canton> findAll();
    Canton findById(Integer id);
    void deleteById(Integer id);
    Canton update(Canton canton);
}
