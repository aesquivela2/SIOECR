import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {
  private apiUrl = 'http://localhost:8080/api/sports';  // Spring Boot API URL for sports

  constructor(private http: HttpClient) {}

  // Method to fetch all sports from the backend
  getAllSports(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
