package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.Person;
import com.olimpiadas.inscriptionsback.Repositories.PersonRepository;
import com.olimpiadas.inscriptionsback.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class PersonServiceImplTest {

    @InjectMocks
    private PersonServiceImpl personService;

    @Mock
    private PersonRepository personRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSavePerson() {
        Person person = new Person();
        person.setId(1);
        when(personRepository.save(any(Person.class))).thenReturn(person);

        Person savedPerson = personService.save(person);

        assertNotNull(savedPerson);
        assertEquals(1, savedPerson.getId());
        verify(personRepository, times(1)).save(person);
    }

    @Test
    void testFindAllPersons() {
        personService.findAll();
        verify(personRepository, times(1)).findAll();
    }

    @Test
    void testFindPersonById_PersonExists() {
        Person person = new Person();
        person.setId(1);
        when(personRepository.findById(1)).thenReturn(Optional.of(person));

        Person foundPerson = personService.findById(1);

        assertNotNull(foundPerson);
        assertEquals(1, foundPerson.getId());
        verify(personRepository, times(1)).findById(1);
    }

    @Test
    void testFindPersonById_PersonNotFound() {
        when(personRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> personService.findById(1));
        verify(personRepository, times(1)).findById(1);
    }

    @Test
    void testDeletePersonById() {
        doNothing().when(personRepository).deleteById(1);

        personService.deleteById(1);

        verify(personRepository, times(1)).deleteById(1);
    }

    @Test
    void testUpdatePerson() {
        Person person = new Person();
        person.setId(1);
        when(personRepository.save(person)).thenReturn(person);

        Person updatedPerson = personService.update(person);

        assertNotNull(updatedPerson);
        assertEquals(1, updatedPerson.getId());
        verify(personRepository, times(1)).save(person);
    }
}
