package com.olimpiadas.inscriptionsback.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;  // Importa las anotaciones JPA
import com.olimpiadas.inscriptionsback.Models.Province;  // Importa la entidad Province

@Entity
@Table(name = "canton")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Canton {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String name;

    // Relación con la entidad 'Province'
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "province_id", nullable = false)
    @JsonIgnore
    private Province province;

    public Canton() {
    }

    public Canton(Integer id, String name, Province province) {
        this.id = id;
        this.name = name;
        this.province = province;
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

    public Integer getProvinceId() {
        return this.province != null ? this.province.getId() : null;
    }

    public void setProvince(Province province) {
        this.province = province;
    }
}
