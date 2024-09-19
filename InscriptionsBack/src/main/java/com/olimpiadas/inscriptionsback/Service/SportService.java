package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.Sport;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SportService {
    Sport save(Sport sport);
    List<Sport> findAll();
    Sport findById(Integer id);
    void deleteById(Integer id);
    Sport update(Sport sport);
}
