package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.Athlete;
import com.olimpiadas.inscriptionsback.Repositories.AthleteRepository;
import com.olimpiadas.inscriptionsback.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AthleteServiceImplTest {

    @InjectMocks
    private AthleteServiceImpl athleteService;

    @Mock
    private AthleteRepository athleteRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveAthlete() {
        Athlete athlete = new Athlete();
        athlete.setId(1);
        doNothing().when(athleteRepository).saveAthlete(athlete);

        athleteService.save(athlete);

        verify(athleteRepository, times(1)).saveAthlete(athlete);
    }

    @Test
    void testFindAllAthletes() {
        athleteService.findAll();
        verify(athleteRepository, times(1)).findAll();
    }

    @Test
    void testFindAthleteById_AthleteExists() {
        Athlete athlete = new Athlete();
        athlete.setId(1);
        when(athleteRepository.findById(1)).thenReturn(Optional.of(athlete));

        Athlete foundAthlete = athleteService.findById(1);

        assertNotNull(foundAthlete);
        assertEquals(1, foundAthlete.getId());
        verify(athleteRepository, times(1)).findById(1);
    }

    @Test
    void testFindAthleteById_AthleteNotFound() {
        when(athleteRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> athleteService.findById(1));
        verify(athleteRepository, times(1)).findById(1);
    }

    @Test
    void testDeleteAthleteById() {
        doNothing().when(athleteRepository).deleteById(1);

        athleteService.deleteById(1);

        verify(athleteRepository, times(1)).deleteById(1);
    }

    @Test
    void testUpdateAthlete() {
        Athlete athlete = new Athlete();
        athlete.setId(1);
        when(athleteRepository.save(athlete)).thenReturn(athlete);

        Athlete updatedAthlete = athleteService.update(athlete);

        assertNotNull(updatedAthlete);
        assertEquals(1, updatedAthlete.getId());
        verify(athleteRepository, times(1)).save(athlete);
    }
}
