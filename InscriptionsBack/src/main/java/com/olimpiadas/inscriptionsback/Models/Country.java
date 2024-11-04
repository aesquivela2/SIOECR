package com.olimpiadas.inscriptionsback.Models;

import jakarta.persistence.*;

@Entity
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToOne
    private GlobalRegion region;

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public GlobalRegion getRegion() {
        return region;
    }

    public void setRegion(GlobalRegion region) {
        this.region = region;
    }
}
