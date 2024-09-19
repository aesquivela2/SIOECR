package com.olimpiadas.inscriptionsback.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "Available_days_Times")
public class AvailableDaysTimes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "available_day_id")
    private AvailableDay availableDay;

    @ManyToOne
    @JoinColumn(name = "time_id")
    private Time time;

    public AvailableDaysTimes() {
    }

    public AvailableDaysTimes(Long id, AvailableDay availableDay, Time time) {
        this.id = id;
        this.availableDay = availableDay;
        this.time = time;
    }

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
