package com.olimpiadas.inscriptionsback.Models;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "Volunteer")
public class Volunteer extends Person {

    @ManyToOne
    @JoinColumn(name = "sport_experience_id")
    private Sport sportExperience;

    @OneToMany(mappedBy = "volunteer", cascade = CascadeType.ALL)
    private Set<VolunteerAvailableDays> availableDays;

    public Sport getSportExperience() {
        return sportExperience;
    }

    public void setSportExperience(Sport sportExperience) {
        this.sportExperience = sportExperience;
    }

    public Set<VolunteerAvailableDays> getAvailableDays() {
        return availableDays;
    }

    public void setAvailableDays(Set<VolunteerAvailableDays> availableDays) {
        this.availableDays = availableDays;
    }
}
