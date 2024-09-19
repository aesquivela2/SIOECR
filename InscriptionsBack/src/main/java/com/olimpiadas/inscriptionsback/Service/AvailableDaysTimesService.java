package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.AvailableDaysTimes;
import java.util.List;

public interface AvailableDaysTimesService {
    AvailableDaysTimes save(AvailableDaysTimes availableDaysTimes);
    List<AvailableDaysTimes> findAll();
    AvailableDaysTimes findById(Integer id);
    void deleteById(Integer id);
    AvailableDaysTimes update(AvailableDaysTimes availableDaysTimes);
}
