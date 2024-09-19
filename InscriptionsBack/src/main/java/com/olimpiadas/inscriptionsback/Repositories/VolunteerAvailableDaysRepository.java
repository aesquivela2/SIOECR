package com.olimpiadas.inscriptionsback.Repositories;

import com.olimpiadas.inscriptionsback.Models.VolunteerAvailableDays;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VolunteerAvailableDaysRepository extends JpaRepository<VolunteerAvailableDays, Integer> {
}