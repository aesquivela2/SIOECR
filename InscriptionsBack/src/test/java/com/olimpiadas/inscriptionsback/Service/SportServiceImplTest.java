package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.Sport;
import com.olimpiadas.inscriptionsback.Repositories.SportRepository;
import com.olimpiadas.inscriptionsback.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SportServiceImplTest {

    @InjectMocks
    private SportServiceImpl sportService;

    @Mock
    private SportRepository sportRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveSport() {
        Sport sport = new Sport();
        sport.setDifficulty("High");
        when(sportRepository.save(any(Sport.class))).thenReturn(sport);

        Sport savedSport = sportService.save(sport);

        assertNotNull(savedSport);
        assertEquals("High", savedSport.getDifficulty());
        verify(sportRepository, times(1)).save(sport);
    }

    @Test
    void testFindAllSports() {
        sportService.findAll();
        verify(sportRepository, times(1)).findAll();
    }

    @Test
    void testFindSportById_SportExists() {
        Sport sport = new Sport();
        sport.setId(1L);
        when(sportRepository.findById(1)).thenReturn(Optional.of(sport));

        Sport foundSport = sportService.findById(1);

        assertNotNull(foundSport);
        assertEquals(1, foundSport.getId());
        verify(sportRepository, times(1)).findById(1);
    }

    @Test
    void testFindSportById_SportNotFound() {
        when(sportRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> sportService.findById(1));
        verify(sportRepository, times(1)).findById(1);
    }

    @Test
    void testDeleteSportById() {
        doNothing().when(sportRepository).deleteById(1);

        sportService.deleteById(1);

        verify(sportRepository, times(1)).deleteById(1);
    }

    @Test
    void testUpdateSport() {
        Sport sport = new Sport();
        sport.setId(1L);
        sport.setDifficulty("Medium");
        when(sportRepository.save(sport)).thenReturn(sport);

        Sport updatedSport = sportService.update(sport);

        assertNotNull(updatedSport);
        assertEquals("Medium", updatedSport.getDifficulty());
        verify(sportRepository, times(1)).save(sport);
    }
}
