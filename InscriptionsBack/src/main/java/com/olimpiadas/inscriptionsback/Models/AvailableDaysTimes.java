package com.olimpiadas.inscriptionsback.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "available_days_Times")
public class AvailableDaysTimes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "available_day_id", nullable = false)
    private AvailableDays availableDay;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "time_id", nullable = false)
    private Time time;

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AvailableDays getAvailableDay() {  // Este método también debe llamarse 'getAvailableDay'
        return availableDay;
    }

    public void setAvailableDay(AvailableDays availableDay) {
        this.availableDay = availableDay;
    }
    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }
}
