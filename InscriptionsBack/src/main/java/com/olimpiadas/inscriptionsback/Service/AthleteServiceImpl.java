package com.olimpiadas.inscriptionsback.Service;
import com.olimpiadas.inscriptionsback.Models.ErrorResponse;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.olimpiadas.inscriptionsback.Models.Athlete;
import com.olimpiadas.inscriptionsback.Repositories.AthleteRepository;
import com.olimpiadas.inscriptionsback.exception.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import org.postgresql.util.PSQLException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Transactional

public class AthleteServiceImpl implements AthleteService {

    private final AthleteRepository athleteRepository;

    public AthleteServiceImpl(AthleteRepository athleteRepository) {
        this.athleteRepository = athleteRepository;
    }

    @Override
    public List<Athlete> findAll() {
        return athleteRepository.findAll();
    }

    @Override
    public Athlete findById(Integer id) {
        return athleteRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Atleta con id " + id + " no se encuentra")
        );
    }

    @Override
    public void deleteById(Integer id) {
        athleteRepository.deleteById(id);
    }

    @Override
    public Athlete update(Athlete athlete) {
        return athleteRepository.save(athlete);
    }
    @Override
    @Transactional // Ensures proper transaction management
    public void save(Athlete athlete) {
        athleteRepository.saveAthlete(
                athlete.getIdentification(),
                athlete.getName(),
                athlete.getBirthdate(),
                athlete.getRegion_id().getId(),  // O el ID correspondiente
                athlete.getEmail(),
                athlete.getPhone_number(),
                athlete.getNationality(),
                athlete.getProvince_id().getId(),  // O el ID correspondiente
                athlete.getCanton_id().getId(),  // O el ID correspondiente
                athlete.getLaterality(),
                athlete.getDisability_type(),
                athlete.getSport().getName(),  // O el valor que corresponda
                athlete.getLevel_category(),
                athlete.getWeight(),
                athlete.getHeight()
        );

    }

    // Método para manejar los errores de PostgreSQL
    @Override
    public String handlePostgreSQLError(Exception e) {
        if (e.getCause() instanceof PSQLException) {
            PSQLException psqlException = (PSQLException) e.getCause();
            String sqlState = psqlException.getSQLState();
            String detailedMessage = psqlException.getServerErrorMessage().getDetail();

            switch (sqlState) {
                case "23505":  // Código para unique_violation
                    return "Ya existe un registro con esta información. Verifica los datos ingresados.";
                case "23503":  // Código para foreign_key_violation
                    return "No se puede registrar, hay una referencia inválida a otra entidad.";
                case "22001":  // Código para value_too_long
                    return "Uno de los campos tiene demasiados caracteres.";
                default:
                    return "Ha ocurrido un error en el sistema. Detalles: " + detailedMessage;
            }
        }
        return "Error desconocido. Contacte al administrador.";
    }

    // Método para extraer el campo que causó el error del mensaje detallado de PostgreSQL
    @Override
    public String extractFieldFromError(String detailedMessage) {
        // Regex para capturar el nombre del campo que causó el error
        Pattern pattern = Pattern.compile("\\((.*?)\\)");
        Matcher matcher = pattern.matcher(detailedMessage);
        if (matcher.find()) {
            return matcher.group(1);  // Retorna el nombre del campo
        }
        return "desconocido";  // Si no se encuentra el campo
    }

}
