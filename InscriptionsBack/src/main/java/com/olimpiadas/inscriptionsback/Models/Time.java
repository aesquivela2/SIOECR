package com.olimpiadas.inscriptionsback.Models;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Time {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String hour;
    private String minutes;

    @OneToMany(mappedBy = "time")
    private Set<AvailableDaysTimes> availableDaysTimes;

    public Time() {
    }

    public Time(Long id, String hour, String minutes, Set<AvailableDaysTimes> availableDaysTimes) {
        this.id = id;
        this.hour = hour;
        this.minutes = minutes;
        this.availableDaysTimes = availableDaysTimes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHour() {
        return hour;
    }

    public void setHour(String hour) {
        this.hour = hour;
    }

    public String getMinutes() {
        return minutes;
    }

    public void setMinutes(String minutes) {
        this.minutes = minutes;
    }

    public Set<AvailableDaysTimes> getAvailableDaysTimes() {
        return availableDaysTimes;
    }

    public void setAvailableDaysTimes(Set<AvailableDaysTimes> availableDaysTimes) {
        this.availableDaysTimes = availableDaysTimes;
    }
}
