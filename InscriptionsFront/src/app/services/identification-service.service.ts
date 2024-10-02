import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdentificationService {

  private apiUrl = 'http://localhost:3000/api/fetch-cedula';  // Ruta de tu backend

  constructor(private http: HttpClient) {}

  // Función para enviar la cédula al backend y obtener los datos
  getDetails(cedula: string): Observable<{ name: string, birthdate: string }> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<{ name: string, birthdate: string }>(this.apiUrl, { cedula }, { headers });
  }
}

export class IdentificationServiceService {
}
