package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.EmergencyContact;
import com.olimpiadas.inscriptionsback.Repositories.EmergencyContactRepository;
import com.olimpiadas.inscriptionsback.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmergencyContactServiceImpl implements EmergencyContactService {

    private final EmergencyContactRepository emergencyContactRepository;

    public EmergencyContactServiceImpl(EmergencyContactRepository emergencyContactRepository) {
        this.emergencyContactRepository = emergencyContactRepository;
    }

    @Override
    public EmergencyContact save(EmergencyContact emergencyContact) {
        return emergencyContactRepository.save(emergencyContact);
    }

    @Override
    public List<EmergencyContact> findAll() {
        return emergencyContactRepository.findAll();
    }

    @Override
    public EmergencyContact findById(Integer id) {
        return emergencyContactRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Contacto de emergencia con id " + id + " no se encuentra")
        );
    }

    @Override
    public void deleteById(Integer id) {
        emergencyContactRepository.deleteById(id);
    }

    @Override
    public EmergencyContact update(EmergencyContact emergencyContact) {
        return emergencyContactRepository.save(emergencyContact);
    }
}
