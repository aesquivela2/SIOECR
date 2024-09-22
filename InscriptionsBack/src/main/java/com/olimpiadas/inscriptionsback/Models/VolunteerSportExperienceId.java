package com.olimpiadas.inscriptionsback.Models;

import java.io.Serializable;
import java.util.Objects;

public class VolunteerSportExperienceId implements Serializable {

    private Integer volunteer;
    private Integer sport;

    // Constructor, hashCode y equals
    public VolunteerSportExperienceId() {
    }

    public VolunteerSportExperienceId(Integer volunteer, Integer sport) {
        this.volunteer = volunteer;
        this.sport = sport;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        VolunteerSportExperienceId that = (VolunteerSportExperienceId) o;
        return Objects.equals(volunteer, that.volunteer) &&
                Objects.equals(sport, that.sport);
    }

    @Override
    public int hashCode() {
        return Objects.hash(volunteer, sport);
    }

    // Getters y setters
    public Integer getVolunteer() {
        return volunteer;
    }

    public void setVolunteer(Integer volunteer) {
        this.volunteer = volunteer;
    }

    public Integer getSport() {
        return sport;
    }

    public void setSport(Integer sport) {
        this.sport = sport;
    }
}
