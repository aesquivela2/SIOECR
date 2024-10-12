import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AthleteService {
  private apiUrl = 'http://localhost:8080/api/athletes';  // Spring Boot API URL for sports

  constructor(private http: HttpClient) {}


  createAthlete(athlete: any): Observable<any> {
    return this.http.post(this.apiUrl, athlete).pipe(
      catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Ocurrió un error desconocido';
          let field = '';
          if (error.error instanceof ErrorEvent) {
              errorMessage = `Error: ${error.error.message}`;
          } else {
              errorMessage = error.error.error;
              field = error.error.field;  // Captura el campo del error
          }
          // Aquí puedes manejar el campo y el error para mostrarlo en la UI
          return throwError(() => ({ field, errorMessage }));
      })
  );;
  }

}
