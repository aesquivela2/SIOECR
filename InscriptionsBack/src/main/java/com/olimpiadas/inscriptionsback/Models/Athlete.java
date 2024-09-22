package com.olimpiadas.inscriptionsback.Models;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "athlete")
public class Athlete extends Person {

    // Relación con SportLevel (nivel deportivo)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sport_level_id", nullable = false)
    private SportLevel sportLevel;

    // Relación con ActivityResults (resultados en actividades)
    @OneToMany(mappedBy = "athlete", cascade = CascadeType.ALL)
    private Set<ActivityResults> activityResults;

    // Otros atributos específicos de Athlete
    @Column(name = "laterality")
    private String laterality;

    @Column(name = "disability_type")
    private String disabilityType;

    // Getters y setters para sportLevel
    public SportLevel getSportLevel() {
        return sportLevel;
    }

    public void setSportLevel(SportLevel sportLevel) {
        this.sportLevel = sportLevel;
    }

    // Getters y setters para activityResults
    public Set<ActivityResults> getActivityResults() {
        return activityResults;
    }

    public void setActivityResults(Set<ActivityResults> activityResults) {
        this.activityResults = activityResults;
    }

    // Getters y setters para laterality
    public String getLaterality() {
        return laterality;
    }

    public void setLaterality(String laterality) {
        this.laterality = laterality;
    }

    // Getters y setters para disabilityType
    public String getDisabilityType() {
        return disabilityType;
    }

    public void setDisabilityType(String disabilityType) {
        this.disabilityType = disabilityType;
    }
}
