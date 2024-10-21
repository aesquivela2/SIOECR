package com.olimpiadas.inscriptionsback.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "sport_level")
public class SportLevel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "sport_id")
    @JsonBackReference
    private Sport sport;


    @Column(name = "description", nullable = false)
    private String description;

    public SportLevel() {
    }

    public SportLevel(Integer id, Sport sport, String description) {
        this.id = id;
        this.sport = sport;
        this.description = description;
    }

    // Getters and setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Sport getSport() {
        return sport;
    }

    public void setSport(Sport sport) {
        this.sport = sport;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
