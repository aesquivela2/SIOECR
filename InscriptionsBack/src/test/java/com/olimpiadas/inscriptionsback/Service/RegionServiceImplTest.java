package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.Region;
import com.olimpiadas.inscriptionsback.Repositories.RegionRepository;
import com.olimpiadas.inscriptionsback.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class RegionServiceImplTest {

    @InjectMocks
    private RegionServiceImpl regionService;

    @Mock
    private RegionRepository regionRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveRegion() {
        Region region = new Region();
        region.setId(1);
        when(regionRepository.save(any(Region.class))).thenReturn(region);

        Region savedRegion = regionService.save(region);

        assertNotNull(savedRegion);
        assertEquals(1, savedRegion.getId());
        verify(regionRepository, times(1)).save(region);
    }

    @Test
    void testFindAllRegions() {
        regionService.findAll();
        verify(regionRepository, times(1)).findAll();
    }

    @Test
    void testFindRegionById_RegionExists() {
        Region region = new Region();
        region.setId(1);
        when(regionRepository.findById(1)).thenReturn(Optional.of(region));

        Region foundRegion = regionService.findById(1);

        assertNotNull(foundRegion);
        assertEquals(1, foundRegion.getId());
        verify(regionRepository, times(1)).findById(1);
    }

    @Test
    void testFindRegionById_RegionNotFound() {
        when(regionRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> regionService.findById(1));
        verify(regionRepository, times(1)).findById(1);
    }

    @Test
    void testDeleteRegionById() {
        doNothing().when(regionRepository).deleteById(1);

        regionService.deleteById(1);

        verify(regionRepository, times(1)).deleteById(1);
    }

    @Test
    void testUpdateRegion() {
        Region region = new Region();
        region.setId(1);
        when(regionRepository.save(region)).thenReturn(region);

        Region updatedRegion = regionService.update(region);

        assertNotNull(updatedRegion);
        assertEquals(1, updatedRegion.getId());
        verify(regionRepository, times(1)).save(region);
    }
}
