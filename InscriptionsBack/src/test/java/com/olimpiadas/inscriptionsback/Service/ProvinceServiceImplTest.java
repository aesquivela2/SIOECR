package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.Province;
import com.olimpiadas.inscriptionsback.Repositories.ProvinceRepository;
import com.olimpiadas.inscriptionsback.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProvinceServiceImplTest {

    @InjectMocks
    private ProvinceServiceImpl provinceService;

    @Mock
    private ProvinceRepository provinceRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveProvince() {
        Province province = new Province();
        province.setId(1);
        when(provinceRepository.save(any(Province.class))).thenReturn(province);

        Province savedProvince = provinceService.save(province);

        assertNotNull(savedProvince);
        assertEquals(1, savedProvince.getId());
        verify(provinceRepository, times(1)).save(province);
    }

    @Test
    void testFindAllProvinces() {
        provinceService.findAll();
        verify(provinceRepository, times(1)).findAll();
    }

    @Test
    void testFindProvinceById_ProvinceExists() {
        Province province = new Province();
        province.setId(1);
        when(provinceRepository.findById(1)).thenReturn(Optional.of(province));

        Province foundProvince = provinceService.findById(1);

        assertNotNull(foundProvince);
        assertEquals(1, foundProvince.getId());
        verify(provinceRepository, times(1)).findById(1);
    }

    @Test
    void testFindProvinceById_ProvinceNotFound() {
        when(provinceRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> provinceService.findById(1));
        verify(provinceRepository, times(1)).findById(1);
    }

    @Test
    void testDeleteProvinceById() {
        doNothing().when(provinceRepository).deleteById(1);

        provinceService.deleteById(1);

        verify(provinceRepository, times(1)).deleteById(1);
    }

    @Test
    void testUpdateProvince() {
        Province province = new Province();
        province.setId(1);
        when(provinceRepository.save(province)).thenReturn(province);

        Province updatedProvince = provinceService.update(province);

        assertNotNull(updatedProvince);
        assertEquals(1, updatedProvince.getId());
        verify(provinceRepository, times(1)).save(province);
    }
}
