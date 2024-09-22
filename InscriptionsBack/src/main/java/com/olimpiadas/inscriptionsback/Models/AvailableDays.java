package com.olimpiadas.inscriptionsback.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "available_days")
public class AvailableDays {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "day_name", nullable = false)
    private String day_name;

    @OneToMany(mappedBy = "availableDay", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<AvailableDaysTimes> availableDaysTimes;

    @OneToMany(mappedBy = "availableDay", cascade = CascadeType.ALL)
    private Set<VolunteerAvailableDays> volunteerAvailableDays;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDay_name() {
        return day_name;
    }

    public void setDay_name(String dayName) {
        this.day_name = dayName;
    }

    public Set<AvailableDaysTimes> getAvailableDaysTimes() {
        return availableDaysTimes;
    }

    public void setAvailableDaysTimes(Set<AvailableDaysTimes> availableDaysTimes) {
        this.availableDaysTimes = availableDaysTimes;
    }

    public Set<VolunteerAvailableDays> getVolunteerAvailableDays() {
        return volunteerAvailableDays;
    }

    public void setVolunteerAvailableDays(Set<VolunteerAvailableDays> volunteerAvailableDays) {
        this.volunteerAvailableDays = volunteerAvailableDays;
    }
}
