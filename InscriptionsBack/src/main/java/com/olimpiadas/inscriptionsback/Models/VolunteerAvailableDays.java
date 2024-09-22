package com.olimpiadas.inscriptionsback.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "volunteer_Available_days")
public class VolunteerAvailableDays {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "volunteer_id")
    private Volunteer volunteer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "available_day_id")
    private AvailableDays availableDay;

    // No es necesario almacenar la hora directamente aquí, ya que la relación se maneja en Available_days_Times

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Volunteer getVolunteer() {
        return volunteer;
    }

    public void setVolunteer(Volunteer volunteer) {
        this.volunteer = volunteer;
    }

    public AvailableDays getAvailableDay() {
        return availableDay;
    }

    public void setAvailableDay(AvailableDays availableDay) {
        this.availableDay = availableDay;
    }
}
