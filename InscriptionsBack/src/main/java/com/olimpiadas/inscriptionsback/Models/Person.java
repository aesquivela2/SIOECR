package com.olimpiadas.inscriptionsback.Models;

import jakarta.persistence.*;
import java.util.Date;
import com.olimpiadas.inscriptionsback.Models.Province;

@Entity
@Table(name = "person", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email") // Asegura que el email sea único
})
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Clave primaria auto-generada
    private Integer id;

    @Column(name = "identification", nullable = false) // Agregando identificación como campo
    private String identification;

    @Column(name = "name", nullable = false) // No nulo
    private String name;

    @Column(name = "birthdate", nullable = false) // No nulo
    private Date birthdate;

    @Column(name = "email", nullable = false) // No nulo y único
    private String email;

    @Column(name = "phone_number") // Opcional
    private String phone_number;

    @Column(name = "nationality") // Opcional
    private String nationality;

    // Relación con la entidad 'Region' (suponiendo que existe la clase 'Region')
    @ManyToOne
    @JoinColumn(name = "region_id", nullable = false, referencedColumnName = "id") // Relación con la tabla Region
    private Region region;

    public Person() {
    }

    public Person(Integer id, String identification, String name, Date birthdate, String email, String phone_number, String nationality, Region region) {
        this.id = id;
        this.identification = identification;
        this.name = name;
        this.birthdate = birthdate;
        this.email = email;
        this.phone_number = phone_number;
        this.nationality = nationality;
        this.region = region;
    }

    // Getters y setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getIdentification() {
        return identification;
    }

    public void setIdentification(String identification) {
        this.identification = identification;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public Region getRegion() {
        return region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }
}

