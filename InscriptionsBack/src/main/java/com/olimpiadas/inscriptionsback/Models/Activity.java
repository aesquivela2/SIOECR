package com.olimpiadas.inscriptionsback.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "activity")
@Inheritance(strategy = InheritanceType.JOINED)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type", nullable = false)
    private String typeActivity;

    @Column(nullable = false, unique = true)
    private String name;

    private String description;
    private LocalDate date;
    private LocalTime time;
    private String duration;
    private String modality;
    private String location;

    @Column(name = "max_participants")
    private Integer maxParticipants;

    @Column(name = "minimum_age")
    private Integer minimumAge;

    @Column(name = "maximum_age")
    private Integer maximumAge;

    @ManyToOne
    @JoinColumn(name = "administrator_id", insertable = false, updatable = false)
    @JsonBackReference
    private Administrator administrator;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "administrator_id", nullable = false)
    @JsonIgnore
    private State state;

    public Activity() {
    }

    public Activity(Long id, String typeActivity, String name, String description, LocalDate date, LocalTime time, String duration, String modality, String location, Integer maxParticipants, Integer minimumAge, Integer maximumAge, Administrator administrator, State state) {
        this.id = id;
        this.typeActivity = typeActivity;
        this.name = name;
        this.description = description;
        this.date = date;
        this.time = time;
        this.duration = duration;
        this.modality = modality;
        this.location = location;
        this.maxParticipants = maxParticipants;
        this.minimumAge = minimumAge;
        this.maximumAge = maximumAge;
        this.administrator = administrator;
        this.state = state;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return typeActivity;
    }

    public void setType(String typeActivity) {
        this.typeActivity = typeActivity;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getModality() {
        return modality;
    }

    public void setModality(String modality) {
        this.modality = modality;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getMaxParticipants() {
        return maxParticipants;
    }

    public void setMaxParticipants(Integer maxParticipants) {
        this.maxParticipants = maxParticipants;
    }

    public Integer getMinimumAge() {
        return minimumAge;
    }

    public void setMinimumAge(Integer minimumAge) {
        this.minimumAge = minimumAge;
    }

    public Integer getMaximumAge() {
        return maximumAge;
    }

    public void setMaximumAge(Integer maximumAge) {
        this.maximumAge = maximumAge;
    }

    public Administrator getAdministrator() {
        return administrator;
    }

    public void setAdministrator(Administrator administrator) {
        this.administrator = administrator;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }
}
