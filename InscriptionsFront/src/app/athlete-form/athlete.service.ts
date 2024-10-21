import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {
  private apiUrl = 'http://localhost:8080/api/athletes';  // Spring Boot API URL for sports

  constructor(private http: HttpClient) {}


  createAthlete(athlete: any, p: { responseType: string }): Observable<any> {
    return this.http.post(this.apiUrl, athlete);
  }

}
