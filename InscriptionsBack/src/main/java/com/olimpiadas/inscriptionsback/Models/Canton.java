package com.olimpiadas.inscriptionsback.Models;

import jakarta.persistence.*;  // Importa las anotaciones JPA
import com.olimpiadas.inscriptionsback.Models.Province;  // Importa la entidad Province

@Entity
@Table(name = "Canton")
public class Canton {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Generación automática del ID
    private Integer id;

    @Column(nullable = false, unique = true) // Nombre no nulo
    private String name;

    // Relación con la entidad 'Province'
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "province_id", nullable = false)
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

    public void setProvince(Province province) {
        this.province = province;
    }
}
