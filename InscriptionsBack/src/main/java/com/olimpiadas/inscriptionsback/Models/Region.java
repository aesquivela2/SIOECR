package com.olimpiadas.inscriptionsback.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "region")
public class Region {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Generación automática del ID
    private Integer id;

    @Column(name = "name", nullable = false)  // Nombre no nulo
    private String name;

    // Relación con la entidad 'Province'
    @ManyToOne
    @JoinColumn(name = "province_id", nullable = false, referencedColumnName = "id")
    private Province province;  // Llave foránea hacia Province

    // Relación con la entidad 'Canton'
    @ManyToOne
    @JoinColumn(name = "canton_id", nullable = false, referencedColumnName = "id")
    private Canton canton;  // Llave foránea hacia Canton

    public Region() {
    }

    public Region(Integer id, String name, Province province, Canton canton) {
        this.id = id;
        this.name = name;
        this.province = province;
        this.canton = canton;
    }

    // Getters y Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

