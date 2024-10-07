package com.olimpiadas.inscriptionsback.Controllers;

import com.olimpiadas.inscriptionsback.Models.Person;
import com.olimpiadas.inscriptionsback.Service.ExternalApiService;
import com.olimpiadas.inscriptionsback.Service.PersonService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/persons")
@CrossOrigin(origins = "http://localhost:4200")
public class PersonController {

    private final PersonService personService;
    private final ExternalApiService externalApiService;

    public PersonController(PersonService personService, ExternalApiService externalApiService) {
        this.personService = personService;
        this.externalApiService = externalApiService;
    }

    @PostMapping
    public Person save(@RequestBody Person person) {
        return personService.save(person);
    }

    @GetMapping
    public List<Person> findAll() {
        return personService.findAll();
    }

    @GetMapping("/{id}")
    public Person findById(@PathVariable Integer id) {
        return personService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Integer id) {
        personService.deleteById(id);
    }

    @PutMapping("/{id}")
    public Person updatePerson(@PathVariable Integer id, @RequestBody Person person) {
        person.setId(id);
        return personService.update(person);
    }

    @GetMapping("/cedula/{cedula}")
    public String getByCedula(@PathVariable String cedula, @RequestParam String tipoCedula) {
        return externalApiService.getDataByCedula(cedula, tipoCedula);
    }
}
