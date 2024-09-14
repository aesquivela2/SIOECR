package com.olimpiadas.inscriptionsback.Models;

import jakarta.persistence.*;  // Importa las anotaciones JPA
import com.olimpiadas.inscriptionsback.Models.Province;  // Importa la entidad Province

@Entity
@Table(name = "canton")
public class Canton {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Generación automática del ID
    private Integer id;

    @Column(name = "name", nullable = false)  // Nombre no nulo
    private String name;

    // Relación con la entidad 'Province'
    @ManyToOne
    @JoinColumn(name = "province_id", nullable = false, referencedColumnName = "id")  // Llave foránea hacia Province
    private Province province;

    public Canton() {
    }

    public Canton(Integer id, String name, Province province) {
        this.id = id;
        this.name = name;
        this.province = province;
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
}
