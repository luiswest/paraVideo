import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LoginForm } from '../interfaces/tipo-login';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { User } from '../models/User';
import { TokensService } from './tokens.service';
import { IToken } from '../interfaces/IToken';
import { Router } from '@angular/router';

const API_URL = environment.servidor + '/api/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  public userActualS = signal(new User);
  private readonly srvTokens = inject(TokensService);
  private router = inject(Router);

  public login(datos : LoginForm): Observable<any> {
    //Iniciar sesión
    return this.http
      .patch<any>(API_URL, datos)
      .pipe(
        tap((tokens) => {
          console.log('Login successful:', tokens);
          this.doLogin(tokens);
          //navegar a home al loguearse
          
        }),
        map(() => true),
        catchError((error) => {
          console.log(error.status);
          return of(error.status)
        })
      );
  }
  public logout() {
    //Cerrar sesión
    //consumir servicio
    if (this.isLoggedIn()) {
      this.http
        .delete(`${API_URL}/api/auth/logout/${this.userActual.cedula}`)
        .subscribe();
      this.doLogout();
    }    
  }
  public doLogin(tokens : IToken) {
    //guardar los tokens
    this.srvTokens.setTokens(tokens);
    //actualizar datos globales para usuario y rol
    this.userActualS.set(this.userActual);
    console.log("sesión", this.userActual)

  }
  public doLogout() {
    //Eliminar tokens
    if (this.srvTokens.token) {
      this.srvTokens.eliminarTokens();
    }
    //limpiar los datos globales para usuario y rol
    this.userActualS.set(this.userActual);
    
    //navegar a la página del login
    this.router.navigate(['/login']);
  }
  public isLoggedIn() : boolean {
    //verificar si hay una sesión inicicada
    return !!this.srvTokens.token && !this.srvTokens.jwtTokenExp();
  }
  
   public get userActual() : User {
    //Getter para retornar los datos del usuario con sesión iniciada
    if (!this.srvTokens.token) {
      return new User();
    } else {
      //decodifica los tokens del sservidor para extraer, usuario, nombre y rol
      const tokenD = this.srvTokens.decodeToken();
      return new User({cedula : tokenD.sub, nombre: tokenD.nom, rol : tokenD.rol})
    }
    
  }
    
}
