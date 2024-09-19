package com.olimpiadas.inscriptionsback.Service;

import com.olimpiadas.inscriptionsback.Models.VolunteerAvailableDays;
import com.olimpiadas.inscriptionsback.Repositories.VolunteerAvailableDaysRepository;
import com.olimpiadas.inscriptionsback.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VolunteerAvailableDaysServiceImpl implements VolunteerAvailableDaysService {

    private final VolunteerAvailableDaysRepository volunteerAvailableDaysRepository;

    public VolunteerAvailableDaysServiceImpl(VolunteerAvailableDaysRepository volunteerAvailableDaysRepository) {
        this.volunteerAvailableDaysRepository = volunteerAvailableDaysRepository;
    }

    @Override
    public VolunteerAvailableDays save(VolunteerAvailableDays volunteerAvailableDays) {
        return volunteerAvailableDaysRepository.save(volunteerAvailableDays);
    }

    @Override
    public List<VolunteerAvailableDays> findAll() {
        return volunteerAvailableDaysRepository.findAll();
    }

    @Override
    public VolunteerAvailableDays findById(Integer id) {
        return volunteerAvailableDaysRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("VolunteerAvailableDays with id " + id + " not found")
        );
    }

    @Override
    public void deleteById(Integer id) {
        volunteerAvailableDaysRepository.deleteById(id);
    }

    @Override
    public VolunteerAvailableDays update(VolunteerAvailableDays volunteerAvailableDays) {
        // Aquí puedes agregar lógica adicional para verificar la existencia antes de actualizar
        return volunteerAvailableDaysRepository.save(volunteerAvailableDays);
    }
}
