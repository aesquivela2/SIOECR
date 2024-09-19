package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.Time;
import java.util.List;

public interface TimeService {
    Time save(Time time);
    List<Time> findAll();
    Time findById(Integer id);
    void deleteById(Integer id);
    Time update(Time time);
}
