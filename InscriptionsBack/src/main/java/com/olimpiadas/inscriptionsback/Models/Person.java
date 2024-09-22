package com.olimpiadas.inscriptionsback.Models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "person")
@Inheritance(strategy = InheritanceType.JOINED)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String identification;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Date birthdate;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "phone_number")
    private String phone_number;

    @Column(name = "nationality")
    private String nationality;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "region_id", nullable = false)
    private Region region;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "province_id", nullable = false)
    private Province province;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "canton_id", nullable = false)
    private Canton canton;


    public Person() {
    }

    public Person(Integer id, String identification, String name, Date birthdate, String email, String phone_number, String nationality, Region region, Province province, Canton canton) {
        this.id = id;
        this.identification = identification;
        this.name = name;
        this.birthdate = birthdate;
        this.email = email;
        this.phone_number = phone_number;
        this.nationality = nationality;
        this.region = region;
        this.province = province;
        this.canton = canton;
    }

    // Getters and setters
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

    public Province getProvince() {
        return province;
    }

    public void setProvince(Province province) {
        this.province = province;
    }

    public Canton getCanton() {
        return canton;
    }

    public void setCanton(Canton canton) {
        this.canton = canton;
    }
}
