import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sport } from '../app.component'

@Injectable({
  providedIn: 'root'
})
export class SportService {
  private apiUrl = 'http://localhost:8080/api/sports';  

  constructor(private http: HttpClient) {}

  getAllSports(): Observable<Sport[]> {  
    return this.http.get<Sport[]>(this.apiUrl);  
  }
}

