package com.olimpiadas.inscriptionsback.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // This will ignore lazy-loading issues
public class Region {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Generación automática del ID
    private Integer id;

    @Column(nullable = false, unique = true)
    private String name;

    // Relación con la entidad 'Province'
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Province province;  // Llave foránea hacia Province

    // Relación con la entidad 'Canton'
    @ManyToOne(fetch = FetchType.LAZY)  // Lazy loading to avoid unnecessary loading
    @JsonIgnore  // Ignore the province when serializing to JSON
    @JoinColumn(name = "canton_id", nullable = false)
    private Canton canton;  // Llave foránea hacia Canton

    public Region() {
    }

    public Region(Integer id, String name, Province province, Canton canton) {
        this.id = id;
        this.name = name;
        this.province = province;
        this.canton = canton;
    }

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

