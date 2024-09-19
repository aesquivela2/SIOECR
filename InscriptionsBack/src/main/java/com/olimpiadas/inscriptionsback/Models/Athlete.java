package com.olimpiadas.inscriptionsback.Models;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Athlete")
@PrimaryKeyJoinColumn(name = "id")
public class Athlete extends Person {

    @ManyToOne
    @JoinColumn(name = "sport_level_id", nullable = false)
    private SportLevel sportLevel;

    @Column(name = "laterality")
    private String laterality;

    @Column(name = "disability_type")
    private String disabilityType;

    @Column(name = "sport")
    private String sport;

    @Column(name = "level_category")
    private String levelCategory;

    @Column(name = "weight")
    private Double weight;

    @Column(name = "height")
    private Double height;

    public Athlete() {
    }

    public Athlete(Integer id, String identification, String name, Date birthdate, String email, String phone_number, String nationality, Region region, SportLevel sportLevel, String laterality, String disabilityType, String sport, String levelCategory, Double weight, Double height) {
        super(id, identification, name, birthdate, email, phone_number, nationality, region);
        this.sportLevel = sportLevel;
        this.laterality = laterality;
        this.disabilityType = disabilityType;
        this.sport = sport;
        this.levelCategory = levelCategory;
        this.weight = weight;
        this.height = height;
    }

    public SportLevel getSportLevel() {
        return sportLevel;
    }

    public void setSportLevel(SportLevel sportLevel) {
        this.sportLevel = sportLevel;
    }

    public String getLaterality() {
        return laterality;
    }

    public void setLaterality(String laterality) {
        this.laterality = laterality;
    }

    public String getDisabilityType() {
        return disabilityType;
    }

    public void setDisabilityType(String disabilityType) {
        this.disabilityType = disabilityType;
    }

    public String getSport() {
        return sport;
    }

    public void setSport(String sport) {
        this.sport = sport;
    }

    public String getLevelCategory() {
        return levelCategory;
    }

    public void setLevelCategory(String levelCategory) {
        this.levelCategory = levelCategory;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }
}
