package com.olimpiadas.inscriptionsback.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ExternalApiService {

    private final String apiUrl = "https://apis.gometa.org/cedulas/";
    private final String apiKey = "uUhKdjmmoaPerZD";  // Keep this private

    public String getDataByCedula(String cedula, String tipoCedula) {
        String url = apiUrl + cedula + "?type="  + tipoCedula  + "&key=" + apiKey;
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);  // You can parse this to a custom model if needed
    }
}
