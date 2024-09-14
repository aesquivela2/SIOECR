package com.olimpiadas.inscriptionsback.Controllers;

import com.olimpiadas.inscriptionsback.Models.Person;
import com.olimpiadas.inscriptionsback.Service.PersonService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/persons")
@CrossOrigin(origins = "http://localhost:4200")
public class PersonController {

    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @PostMapping
    Person save(@RequestBody Person person){
        return personService.save(person);
    }

    @GetMapping
    public List<Person> findAll(){
        return personService.findAll();
    }

    @GetMapping("/{id}")
    public Person findById(@PathVariable Integer id){
        return personService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Integer id){
        personService.deleteById(id);
    }

    @PutMapping
    public Person updatePerson(@RequestBody Person person){
        Person personDb = personService.findById(person.getId());

        personDb.setIdentification(person.getIdentification());  // Actualizar identificación
        personDb.setName(person.getName());
        personDb.setBirthdate(person.getBirthdate());
        personDb.setEmail(person.getEmail());
        personDb.setPhone_number(person.getPhone_number());
        personDb.setNationality(person.getNationality());
        personDb.setRegion(person.getRegion());  // Actualizar la región

        return personService.update(personDb);
    }
}
