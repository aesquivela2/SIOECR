package com.olimpiadas.inscriptionsback.Models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@PrimaryKeyJoinColumn(name = "id") // Esto mapea la herencia en la tabla de la clase base
public class Sport extends Activity {

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String difficulty;

    @Column(name = "needs_special_equipment")
    private Boolean needsSpecialEquipment;

    @Column(name = "specifications")
    private String specifications;

    @Column(name = "level")
    private String level;

    // One-to-Many relationship with SportLevel
    @OneToMany(mappedBy = "sport", cascade = CascadeType.ALL)
    private List<SportLevel> sportLevels;

    public Sport() {
    }

    public Sport(String type, String difficulty, Boolean needsSpecialEquipment, String specifications, String level) {
        this.type = type;
        this.difficulty = difficulty;
        this.needsSpecialEquipment = needsSpecialEquipment;
        this.specifications = specifications;
        this.level = level;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public Boolean getNeedsSpecialEquipment() {
        return needsSpecialEquipment;
    }

    public void setNeedsSpecialEquipment(Boolean needsSpecialEquipment) {
        this.needsSpecialEquipment = needsSpecialEquipment;
    }

    public String getSpecifications() {
        return specifications;
    }

    public void setSpecifications(String specifications) {
        this.specifications = specifications;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public List<SportLevel> getSportLevels() {
        return sportLevels;
    }

    public void setSportLevels(List<SportLevel> sportLevels) {
        this.sportLevels = sportLevels;
    }
}
