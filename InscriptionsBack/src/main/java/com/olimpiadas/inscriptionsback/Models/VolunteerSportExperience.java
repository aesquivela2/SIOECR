package com.olimpiadas.inscriptionsback.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "volunteer_sport_experience")
@IdClass(VolunteerSportExperienceId.class)  // Esto especifica que usas una clave primaria compuesta
public class VolunteerSportExperience {

    @Id
    @ManyToOne
    @JoinColumn(name = "volunteer_id", nullable = false)
    private Volunteer volunteer;

    @Id
    @ManyToOne
    @JoinColumn(name = "sport_id", nullable = false)
    private Sport sport;

    // Constructor, getters y setters
    public Volunteer getVolunteer() {
        return volunteer;
    }

    public void setVolunteer(Volunteer volunteer) {
        this.volunteer = volunteer;
    }

    public Sport getSport() {
        return sport;
    }

    public void setSport(Sport sport) {
        this.sport = sport;
    }
}
