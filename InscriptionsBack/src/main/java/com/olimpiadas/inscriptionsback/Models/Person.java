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
    private Region region_id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "province_id", nullable = false)
    private Province province_id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "canton_id", nullable = false)
    private Canton canton_id;


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
        this.region_id = region;
        this.province_id = province;
        this.canton_id = canton;
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

    public Region getRegion_id() {
        return region_id;
    }

    public void setRegion_id(Region region_id) {
        this.region_id = region_id;
    }

    public Province getProvince_id() {
        return province_id;
    }

    public void setProvince_id(Province province) {
        this.province_id = province;
    }

    public Canton getCanton_id() {
        return canton_id;
    }

    public void setCanton_id(Canton canton) {
        this.canton_id = canton;
    }
}
