import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sport } from '../app.component'
import {SportLevel} from "./sport-level.service";

@Injectable({
  providedIn: 'root'
})
export class SportService {

  constructor(private http: HttpClient) {}


  getAllSports(): Observable<any> {
    return this.http.get('http://localhost:8080/api/sport-levels');  // Ruta de tu API para cantones
  }

}

