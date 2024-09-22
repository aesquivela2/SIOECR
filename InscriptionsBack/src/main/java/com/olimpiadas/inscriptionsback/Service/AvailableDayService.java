package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.AvailableDays;
import java.util.List;

public interface AvailableDayService {
    AvailableDays save(AvailableDays availableDays);
    List<AvailableDays> findAll();
    AvailableDays findById(Integer id);
    void deleteById(Integer id);
    AvailableDays update(AvailableDays availableDays);
}
