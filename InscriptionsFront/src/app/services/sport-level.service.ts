import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SportLevel {
  id: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class SportLevelService {
  private apiUrl = 'http://localhost:8080/api/sport-levels'; // Asegúrate de que la URL esté correcta

  constructor(private http: HttpClient) { }

  // Obtener la descripción de todos los niveles deportivos
  getAllSportLevelsDescriptions(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/descriptions`);
  }
}