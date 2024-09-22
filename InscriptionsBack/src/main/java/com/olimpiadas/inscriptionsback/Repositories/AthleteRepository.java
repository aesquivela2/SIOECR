package com.olimpiadas.inscriptionsback.Repositories;

import com.olimpiadas.inscriptionsback.Models.Athlete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface AthleteRepository extends JpaRepository<Athlete, Integer> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO athlete (identification, name, birthdate, region_id, email, phone_number, nationality, province_id, canton_id, laterality, disability_type, sport, level_category, weight, height) " +
            "VALUES (:#{#athlete.identification}, :#{#athlete.name}, :#{#athlete.birthdate}, :#{#athlete.region_id}, :#{#athlete.email}, :#{#athlete.phone_number}, :#{#athlete.nationality}, " +
            ":#{#athlete.province_id}, :#{#athlete.canton_id}, :#{#athlete.laterality}, :#{#athlete.disability_type}, :#{#athlete.sport}, :#{#athlete.level_category}, :#{#athlete.weight}, :#{#athlete.height})",
            nativeQuery = true)
    void saveAthlete(Athlete athlete);
}
