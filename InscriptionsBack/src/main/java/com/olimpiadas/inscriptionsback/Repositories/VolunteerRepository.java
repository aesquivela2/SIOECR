package com.olimpiadas.inscriptionsback.Repositories;

import com.olimpiadas.inscriptionsback.Models.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Repository
public interface VolunteerRepository extends JpaRepository<Volunteer, Integer> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO volunteer (id, identification, name, birthdate, region_id, email, phone_number, nationality) " +
            "VALUES (:id, :identification, :name, :birthdate, :region_id, :email, :phone_number, :nationality)", nativeQuery = true)
    void saveVolunteer(@Param("id") Integer id,
                       @Param("identification") String identification,
                       @Param("name") String name,
                       @Param("birthdate") Date birthdate,
                       @Param("region_id") Integer regionId,
                       @Param("email") String email,
                       @Param("phone_number") String phoneNumber,
                       @Param("nationality") String nationality);
}

