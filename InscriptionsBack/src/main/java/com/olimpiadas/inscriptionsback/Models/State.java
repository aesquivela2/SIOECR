package com.olimpiadas.inscriptionsback.Models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "state")
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String description;

    // Relación con Activity (Uno a Muchos)
    @OneToMany(mappedBy = "state", cascade = CascadeType.ALL)
    private List<Activity> activities;

    public State() {
    }

    public State(Long id, String description, List<Activity> activities) {
        this.id = id;
        this.description = description;
        this.activities = activities;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Activity> getActivities() {
        return activities;
    }

    public void setActivities(List<Activity> activities) {
        this.activities = activities;
    }
}

