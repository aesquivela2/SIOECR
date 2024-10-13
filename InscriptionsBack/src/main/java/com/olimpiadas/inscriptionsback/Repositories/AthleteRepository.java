package com.olimpiadas.inscriptionsback.Repositories;

import com.olimpiadas.inscriptionsback.Models.Athlete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Repository
public interface AthleteRepository extends JpaRepository<Athlete, Integer> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO athlete (identification, name, birthdate, region_id, email, phone_number, nationality, province_id, canton_id, laterality, disability_type, sport, level_category, weight, height) " +
            "VALUES (:identification, :name, :birthdate, :region_id, :email, :phone_number, :nationality, :province_id, :canton_id, :laterality, :disability_type, :sport, :level_category, :weight, :height)",
            nativeQuery = true)
    void saveAthlete(@Param("identification") String identification,
                     @Param("name") String name,
                     @Param("birthdate") Date birthdate,
                     @Param("region_id") Integer region_id,
                     @Param("email") String email,
                     @Param("phone_number") String phone_number,
                     @Param("nationality") String nationality,
                     @Param("province_id") Integer province_id,
                     @Param("canton_id") Integer canton_id,
                     @Param("laterality") String laterality,
                     @Param("disability_type") String disability_type,
                     @Param("sport") String sport,
                     @Param("level_category") String level_category,
                     @Param("weight") Double weight,
                     @Param("height") Double height);

}
