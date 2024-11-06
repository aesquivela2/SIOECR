import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private personalData: any = {}; // Datos generales (nombre, identificación, etc.)
  private athleteData: any = {}; // Datos específicos de atleta
  private volunteerData: any = {}; // Datos específicos de voluntario
  private apiUrl = 'http://localhost:8080/api/persons/cedula';  // Spring Boot API URL
  private formData: any = {};
  currentStep = 1;

  constructor(private http: HttpClient) {}

  // Método para establecer datos en formData
  setFormData(data: any) {
    console.log('Guardando datos en formData:', data);
    this.formData = { ...this.formData, ...data };
  }

  // Método para obtener datos de formData
  getFormData() {
    console.log(this.formData)
    return this.formData;
  }

  // Métodos para gestionar datos generales
  setPersonalData(data: any) {
    this.personalData = { ...this.personalData, ...data };
  }

  getPersonalData() {
    return this.personalData;
  }

  // Métodos para gestionar datos de atleta
  setAthleteData(data: any) {
    this.athleteData = { ...this.athleteData, ...data };
  }

  // Método para obtener datos de atleta
  getAthleteData() {
    return this.athleteData;
  }

  // Métodos para gestionar datos de voluntario
  setVolunteerData(data: any) {
    this.volunteerData = { ...this.volunteerData, ...data };
  }

  getVolunteerData() {
    return this.volunteerData;
  }



  // Método para limpiar los datos del formulario
  resetFormData() {
    this.formData = {};  // Restablece formData a un objeto vacío
    this.currentStep = 1; // Reinicia el paso actual
    this.athleteData = {};
    this.volunteerData = {};
  }

  searchByCedula(cedula: string, tipoCedula: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${cedula}?tipoCedula=${tipoCedula}`);
  }


  createAthlete(athlete: any): Observable<any> {
    return this.http.post(this.apiUrl, athlete);
  }

  getProvinces(): Observable<any> {
    return this.http.get('http://localhost:8080/api/provinces');
  }

  getCantons(): Observable<any> {
    return this.http.get('http://localhost:8080/api/cantons');
  }

  getRegions(): Observable<any> {
    return this.http.get('http://localhost:8080/api/regions');
  }
}
