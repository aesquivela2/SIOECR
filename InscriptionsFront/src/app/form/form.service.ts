import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private apiUrl = 'http://localhost:8080/api/persons/cedula';  // Spring Boot API URL
  private formData: any = {};


  constructor(private http: HttpClient) {}
  currentStep = 1;

  // Métodos para manejar el formData
  setFormData(data: any) {
    console.log('Guardando datos en formData:', data);
    this.formData = { ...this.formData, ...data };  // Mezcla los nuevos datos con los existentes
  }


  getFormData() {
    return this.formData;
  }

  resetFormData() {
    this.formData = {};
  }

  // Método para buscar por cédula
  searchByCedula(cedula: string, tipoCedula: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${cedula}?tipoCedula=${tipoCedula}`);
  }

  // Método para crear un atleta (ejemplo)
  createAthlete(athlete: any): Observable<any> {
    return this.http.post(this.apiUrl, athlete);
  }

  // Nuevo método para obtener provincias
  getProvinces(): Observable<any> {
    return this.http.get('http://localhost:8080/api/provinces');  // Ruta de tu API para provincias
  }

  // Nuevo método para obtener cantones
  getCantons(): Observable<any> {
    return this.http.get('http://localhost:8080/api/cantons');  // Ruta de tu API para cantones
  }

  // Nuevo método para obtener regiones
  getRegions(): Observable<any> {
    return this.http.get('http://localhost:8080/api/regions');  // Ruta de tu API para regiones
  }

}
