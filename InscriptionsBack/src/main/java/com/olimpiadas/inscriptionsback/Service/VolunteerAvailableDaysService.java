package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.VolunteerAvailableDays;
import java.util.List;

public interface VolunteerAvailableDaysService {
    VolunteerAvailableDays save(VolunteerAvailableDays volunteerAvailableDays);
    List<VolunteerAvailableDays> findAll();
    VolunteerAvailableDays findById(Integer id);
    void deleteById(Integer id);
    VolunteerAvailableDays update(VolunteerAvailableDays volunteerAvailableDays);

}
