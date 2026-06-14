import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LoginForm } from '../interfaces/tipo-login';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

const API_URL = environment.servidor + '/api/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  public login(datos : LoginForm): Observable<any> {
   
    return this.http
      .patch<any>(API_URL, datos)
      .pipe(
        tap((response) => {
          // Handle successful login, e.g., store token, user info, etc.
          console.log('Login successful:', response);
        })
      );
  }
}
