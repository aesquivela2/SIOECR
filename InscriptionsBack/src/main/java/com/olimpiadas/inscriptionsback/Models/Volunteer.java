package com.olimpiadas.inscriptionsback.Models;

import jakarta.persistence.*;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "volunteer")
@PrimaryKeyJoinColumn(name = "id")
public class Volunteer extends Person {

    public Volunteer() {
        super(); // Llama al constructor de Person
    }

    public Volunteer(Integer id, String identification, String name, Date birthdate, String email, String phone_number, String nationality, Region region, Province province, Canton canton) {
        super(id, identification, name, birthdate, email, phone_number, nationality, region, province, canton);
    }

    // Relación con VolunteerAvailableDays
    @OneToMany(mappedBy = "volunteer", cascade = CascadeType.ALL)
    private Set<VolunteerAvailableDays> availableDays;

    @OneToMany(mappedBy = "volunteer", cascade = CascadeType.ALL)
    private Set<VolunteerSportExperience> sportExperiences;

    // Getters y setters
    public Set<VolunteerAvailableDays> getAvailableDays() {
        return availableDays;
    }

    public void setAvailableDays(Set<VolunteerAvailableDays> availableDays) {
        this.availableDays = availableDays;
    }

    public Set<VolunteerSportExperience> getSportExperiences() {
        return sportExperiences;
    }

    public void setSportExperiences(Set<VolunteerSportExperience> sportExperiences) {
        this.sportExperiences = sportExperiences;
    }
}
