import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly apiUrl = `${environment.apiUrl}/usuarios`;
  constructor(private http: HttpClient) {}

  realizarLogin(email: string, senha: string): Observable<Usuario[]> {
    return this.http
      .get<Usuario[]>(`${this.apiUrl}?email=${email}&senha=${senha}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Erro na chamada da API', error);
    // aqui você pode tratar status (401, 404, etc) e exibir snackbar
    return throwError(() => error);
  }
}
