package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.Volunteer;
import com.olimpiadas.inscriptionsback.Repositories.VolunteerRepository;
import com.olimpiadas.inscriptionsback.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class VolunteerServiceImplTest {

    @InjectMocks
    private VolunteerServiceImpl volunteerService;

    @Mock
    private VolunteerRepository volunteerRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveVolunteer() {
        Volunteer volunteer = new Volunteer();
        volunteer.setId(1);
        when(volunteerRepository.save(any(Volunteer.class))).thenReturn(volunteer);

        Volunteer savedVolunteer = volunteerService.save(volunteer);

        assertNotNull(savedVolunteer);
        assertEquals(1, savedVolunteer.getId());
        verify(volunteerRepository, times(1)).save(volunteer);
    }

    @Test
    void testFindAllVolunteers() {
        volunteerService.findAll();
        verify(volunteerRepository, times(1)).findAll();
    }

    @Test
    void testFindVolunteerById_VolunteerExists() {
        Volunteer volunteer = new Volunteer();
        volunteer.setId(1);
        when(volunteerRepository.findById(1)).thenReturn(Optional.of(volunteer));

        Volunteer foundVolunteer = volunteerService.findById(1);

        assertNotNull(foundVolunteer);
        assertEquals(1, foundVolunteer.getId());
        verify(volunteerRepository, times(1)).findById(1);
    }

    @Test
    void testFindVolunteerById_VolunteerNotFound() {
        when(volunteerRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> volunteerService.findById(1));
        verify(volunteerRepository, times(1)).findById(1);
    }

    @Test
    void testDeleteVolunteerById() {
        doNothing().when(volunteerRepository).deleteById(1);

        volunteerService.deleteById(1);

        verify(volunteerRepository, times(1)).deleteById(1);
    }

    @Test
    void testUpdateVolunteer() {
        Volunteer volunteer = new Volunteer();
        volunteer.setId(1);
        when(volunteerRepository.save(volunteer)).thenReturn(volunteer);

        Volunteer updatedVolunteer = volunteerService.update(volunteer);

        assertNotNull(updatedVolunteer);
        assertEquals(1, updatedVolunteer.getId());
        verify(volunteerRepository, times(1)).save(volunteer);
    }

    @Test
    void testSaveVolunteerSpecificMethod() {
        Volunteer volunteer = new Volunteer();
        volunteer.setId(1);
        //doNothing().when(volunteerRepository).saveVolunteer(volunteer);

        volunteerService.saveVolunteer(volunteer);

        //verify(volunteerRepository, times(1)).saveVolunteer(volunteer);
    }
}
