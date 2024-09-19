package com.olimpiadas.inscriptionsback.Models;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Volunteer")
@PrimaryKeyJoinColumn(name = "id")
public class Volunteer extends Person {

    @ManyToOne
    @JoinColumn(name = "sport_experience_id", nullable = false)
    private Sport sportExperience;

    public Volunteer() {
    }

    public Volunteer(Integer id, String identification, String name, Date birthdate, String email, String phone_number, String nationality, Region region, Sport sportExperience) {
        super(id, identification, name, birthdate, email, phone_number, nationality, region);
        this.sportExperience = sportExperience;
    }

    public Sport getSportExperience() {
        return sportExperience;
    }

    public void setSportExperience(Sport sportExperience) {
        this.sportExperience = sportExperience;
    }
}
