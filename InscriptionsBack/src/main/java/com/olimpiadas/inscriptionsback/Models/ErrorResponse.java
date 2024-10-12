package com.olimpiadas.inscriptionsback.Models;

public class ErrorResponse {
    private String field;
    private String errorMessage;

    public ErrorResponse(String field, String errorMessage) {
        this.field = field;
        this.errorMessage = errorMessage;
    }

    // Getters y Setters
    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}