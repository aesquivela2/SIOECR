package com.olimpiadas.inscriptionsback.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "athlete")
public class Athlete extends Person {

    // Relación con Sport
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sport", nullable = false)
    @NotNull(message = "Sport is mandatory") // Asegurarse de que este campo no sea nulo
    private Sport sport;

    // Relación con SportLevel (nivel deportivo)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sport_level_id", nullable = false)
    @NotNull(message = "Sport level is mandatory") // Asegurarse de que este campo no sea nulo
    private SportLevel sportLevel;

    // Otros atributos específicos de Athlete
    @Column(name = "laterality")
    @Size(max = 10, message = "Laterality cannot exceed 10 characters") // Validación de tamaño
    private String laterality;

    @Column(name = "disability_type")
    @Size(max = 50, message = "Disability type cannot exceed 50 characters") // Validación de tamaño
    private String disability_type;

    // Nuevo atributo: categoría del nivel del atleta
    @Column(name = "level_category")
    @Size(max = 50, message = "Level category cannot exceed 50 characters")
    private String level_category;

    // Nuevo atributo: peso del atleta
    @Column(name = "weight")
    private Double weight;

    // Nuevo atributo: altura del atleta
    @Column(name = "height")
    private Double height;

    // Getters y setters para Sport
    public Sport getSport() {
        return sport;
    }

    public void setSport(Sport sport) {
        this.sport = sport;
    }

    // Getters y setters para SportLevel
    public SportLevel getSportLevel() {
        return sportLevel;
    }

    public void setSportLevel(SportLevel sportLevel) {
        this.sportLevel = sportLevel;
    }

    // Getters y setters para laterality
    public String getLaterality() {
        return laterality;
    }

    public void setLaterality(String laterality) {
        this.laterality = laterality;
    }

    // Getters y setters para disabilityType
    public String getDisability_type() {
        return disability_type;
    }

    public void setDisability_type(String disability_type) {
        this.disability_type = disability_type;
    }

    // Getters y setters para levelCategory
    public String getLevel_category() {
        return level_category;
    }

    public void setLevel_category(String levelCategory) {
        this.level_category = levelCategory;
    }

    // Getters y setters para weight
    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    // Getters y setters para height
    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }
}

