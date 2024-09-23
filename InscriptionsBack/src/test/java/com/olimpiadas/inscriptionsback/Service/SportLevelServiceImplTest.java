package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.SportLevel;
import com.olimpiadas.inscriptionsback.Repositories.SportLevelRepository;
import com.olimpiadas.inscriptionsback.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SportLevelServiceImplTest {

    @InjectMocks
    private SportLevelServiceImpl sportLevelService;

    @Mock
    private SportLevelRepository sportLevelRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveSportLevel() {
        SportLevel sportLevel = new SportLevel();
        sportLevel.setId(1);
        sportLevel.setDescription("Beginner");
        when(sportLevelRepository.save(any(SportLevel.class))).thenReturn(sportLevel);

        SportLevel savedSportLevel = sportLevelService.save(sportLevel);

        assertNotNull(savedSportLevel);
        assertEquals("Beginner", savedSportLevel.getDescription());
        verify(sportLevelRepository, times(1)).save(sportLevel);
    }

    @Test
    void testFindAllSportLevels() {
        sportLevelService.findAll();
        verify(sportLevelRepository, times(1)).findAll();
    }

    @Test
    void testFindSportLevelById_SportLevelExists() {
        SportLevel sportLevel = new SportLevel();
        sportLevel.setId(1);
        when(sportLevelRepository.findById(1)).thenReturn(Optional.of(sportLevel));

        SportLevel foundSportLevel = sportLevelService.findById(1);

        assertNotNull(foundSportLevel);
        assertEquals(1, foundSportLevel.getId());
        verify(sportLevelRepository, times(1)).findById(1);
    }

    @Test
    void testFindSportLevelById_SportLevelNotFound() {
        when(sportLevelRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> sportLevelService.findById(1));
        verify(sportLevelRepository, times(1)).findById(1);
    }

    @Test
    void testDeleteSportLevelById() {
        doNothing().when(sportLevelRepository).deleteById(1);

        sportLevelService.deleteById(1);

        verify(sportLevelRepository, times(1)).deleteById(1);
    }

    @Test
    void testUpdateSportLevel() {
        SportLevel sportLevel = new SportLevel();
        sportLevel.setId(1);
        sportLevel.setDescription("Intermediate");
        when(sportLevelRepository.save(sportLevel)).thenReturn(sportLevel);

        SportLevel updatedSportLevel = sportLevelService.update(sportLevel);

        assertNotNull(updatedSportLevel);
        assertEquals("Intermediate", updatedSportLevel.getDescription());
        verify(sportLevelRepository, times(1)).save(sportLevel);
    }
}
