package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.Person;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface PersonService {
    Person save(Person person);
    List<Person> findAll();
    Person findById(Integer id);
    void deleteById(Integer id);
    Person update (Person person);
}
