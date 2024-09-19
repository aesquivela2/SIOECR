package com.olimpiadas.inscriptionsback.Models;


import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "Administrator")
public class Administrator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    // Relación con Activity (Uno a Muchos)
    @OneToMany(mappedBy = "administrator", cascade = CascadeType.ALL)
    private List<Activity> activities;

    public Administrator() {
    }

    public Administrator(Long id, String email, String password, List<Activity> activities) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.activities = activities;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Activity> getActivities() {
        return activities;
    }

    public void setActivities(List<Activity> activities) {
        this.activities = activities;
    }
}
