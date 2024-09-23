package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.Canton;
import com.olimpiadas.inscriptionsback.Repositories.CantonRepository;
import com.olimpiadas.inscriptionsback.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CantonServiceImplTest {

    @InjectMocks
    private CantonServiceImpl cantonService;

    @Mock
    private CantonRepository cantonRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveCanton() {
        Canton canton = new Canton();
        canton.setId(1);
        when(cantonRepository.save(any(Canton.class))).thenReturn(canton);

        Canton savedCanton = cantonService.save(canton);

        assertNotNull(savedCanton);
        assertEquals(1, savedCanton.getId());
        verify(cantonRepository, times(1)).save(canton);
    }

    @Test
    void testFindAllCantons() {
        cantonService.findAll();
        verify(cantonRepository, times(1)).findAll();
    }

    @Test
    void testFindCantonById_CantonExists() {
        Canton canton = new Canton();
        canton.setId(1);
        when(cantonRepository.findById(1)).thenReturn(Optional.of(canton));

        Canton foundCanton = cantonService.findById(1);

        assertNotNull(foundCanton);
        assertEquals(1, foundCanton.getId());
        verify(cantonRepository, times(1)).findById(1);
    }

    @Test
    void testFindCantonById_CantonNotFound() {
        when(cantonRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> cantonService.findById(1));
        verify(cantonRepository, times(1)).findById(1);
    }

    @Test
    void testDeleteCantonById() {
        doNothing().when(cantonRepository).deleteById(1);

        cantonService.deleteById(1);

        verify(cantonRepository, times(1)).deleteById(1);
    }

    @Test
    void testUpdateCanton() {
        Canton canton = new Canton();
        canton.setId(1);
        when(cantonRepository.save(canton)).thenReturn(canton);

        Canton updatedCanton = cantonService.update(canton);

        assertNotNull(updatedCanton);
        assertEquals(1, updatedCanton.getId());
        verify(cantonRepository, times(1)).save(canton);
    }
}
