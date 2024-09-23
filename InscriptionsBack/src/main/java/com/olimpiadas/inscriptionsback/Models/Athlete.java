package com.olimpiadas.inscriptionsback.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.Set;

@Entity
@Table(name = "athlete")
public class Athlete extends Person {

    // Relación con SportLevel (nivel deportivo)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sport_level_id", nullable = false)
    @NotNull(message = "Sport level is mandatory") // Asegurarse de que este campo no sea nulo
    private SportLevel sportLevel;

    // Relación con ActivityResults (resultados en actividades)
    @OneToMany(mappedBy = "athlete", cascade = CascadeType.ALL)
    private Set<ActivityResults> activityResults;

    // Otros atributos específicos de Athlete
    @Column(name = "laterality")
    @Size(max = 10, message = "Laterality cannot exceed 10 characters") // Validación de tamaño
    private String laterality;

    @Column(name = "disability_type")
    @Size(max = 50, message = "Disability type cannot exceed 50 characters") // Validación de tamaño
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
