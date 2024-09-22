package com.olimpiadas.inscriptionsback.Controllers;

import com.olimpiadas.inscriptionsback.Models.Province;
import com.olimpiadas.inscriptionsback.Service.ProvinceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/provinces")
@CrossOrigin(origins = "http://localhost:4200")
public class ProvinceController {

    private final ProvinceService provinceService;

    public ProvinceController(ProvinceService provinceService) {
        this.provinceService = provinceService;
    }

    @GetMapping
    public List<Province> getAllProvinces() {
        return provinceService.findAll();
    }

    @GetMapping("/{id}")
    public Province getProvinceById(@PathVariable Integer id) {
        return provinceService.findById(id);
    }

    @PostMapping
    public Province createProvince(@RequestBody Province province) {
        return provinceService.save(province);
    }

    @PutMapping("/{id}")
    public Province updateProvince(@PathVariable Integer id, @RequestBody Province provinceDetails) {
        Province province = provinceService.findById(id);
        province.setName(provinceDetails.getName());
        return provinceService.update(province);
    }

    @DeleteMapping("/{id}")
    public void deleteProvince(@PathVariable Integer id) {
        provinceService.deleteById(id);
    }
}
