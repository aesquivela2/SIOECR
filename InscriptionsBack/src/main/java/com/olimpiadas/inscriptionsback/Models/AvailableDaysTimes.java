package com.olimpiadas.inscriptionsback.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "Available_days_Times")
public class AvailableDaysTimes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "available_day_id", nullable = false)
    private AvailableDay availableDay;

    @ManyToOne
    @JoinColumn(name = "time_id", nullable = false)
    private Time time;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AvailableDay getAvailableDay() {
        return availableDay;
    }

    public void setAvailableDay(AvailableDay availableDay) {
        this.availableDay = availableDay;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }
}
