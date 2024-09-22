package com.olimpiadas.inscriptionsback.Repositories;

import com.olimpiadas.inscriptionsback.Models.AvailableDays;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AvailableDayRepository extends JpaRepository<AvailableDays, Integer> {
}
