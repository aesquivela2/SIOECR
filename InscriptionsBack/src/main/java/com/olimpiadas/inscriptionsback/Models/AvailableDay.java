package com.olimpiadas.inscriptionsback.Models;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "Available_days")
public class AvailableDay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "day_name", nullable = false)
    private String dayName;

    @OneToMany(mappedBy = "availableDay", cascade = CascadeType.ALL)
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

    public String getDayName() {
        return dayName;
    }

    public void setDayName(String dayName) {
        this.dayName = dayName;
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
