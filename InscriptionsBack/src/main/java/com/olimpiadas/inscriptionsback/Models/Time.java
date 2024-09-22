package com.olimpiadas.inscriptionsback.Models;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "time")
public class Time {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hour", nullable = false)
    private String hour;

    @Column(name = "minutes", nullable = false)
    private String minutes;

    @OneToMany(mappedBy = "time", cascade = CascadeType.ALL)
    private Set<AvailableDaysTimes> availableDaysTimes;

    // Getters and Setters

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
