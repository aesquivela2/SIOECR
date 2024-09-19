package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.EmergencyContact;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EmergencyContactService {
    EmergencyContact save(EmergencyContact emergencyContact);
    List<EmergencyContact> findAll();
    EmergencyContact findById(Integer id);
    void deleteById(Integer id);
    EmergencyContact update(EmergencyContact emergencyContact);
}
