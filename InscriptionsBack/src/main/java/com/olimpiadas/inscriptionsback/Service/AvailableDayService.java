package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.AvailableDay;
import java.util.List;

public interface AvailableDayService {
    AvailableDay save(AvailableDay availableDay);
    List<AvailableDay> findAll();
    AvailableDay findById(Integer id);
    void deleteById(Integer id);
    AvailableDay update(AvailableDay availableDay);
}
