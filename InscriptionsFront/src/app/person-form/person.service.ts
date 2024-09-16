import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = 'http://localhost:8080/api/persons'; 

  constructor(private http: HttpClient) {}

  createPerson(person: any): Observable<any> {
    return this.http.post(this.apiUrl, person); 
  }
}
