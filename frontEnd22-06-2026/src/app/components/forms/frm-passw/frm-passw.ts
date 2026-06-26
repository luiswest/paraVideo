import { Component, signal, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormField, FormRoot, form, minLength, required } from '@angular/forms/signals';
import { MatInput } from "@angular/material/input";
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SrvUsuario } from '../../../shared/services/usuario.service';
import { AuthService } from '../../../shared/services/auth.service';

interface PasswForm {
    passw : string;
    passwN : string;
    passwR : string;        
}

@Component({
  selector: 'app-frm-passw',
  imports: [MatCardModule, MatIconModule, MatButtonModule,
    MatFormFieldModule, MatFormField, FormRoot, MatInput, FormField],
  templateUrl: './frm-passw.html',
  styleUrl: './frm-passw.css',
})
export class FrmPassw {
  dialogRef = inject(MatDialogRef<FrmPassw>)
  private readonly router = inject(Router);
  private readonly srvUsuario = inject(SrvUsuario);
  
  private readonly srvAuth = inject(AuthService);

  public mostrarError = signal(false);
  
  objPassw = signal<PasswForm>( {
    passw: '',
    passwN: '',
    passwR: ''
  });

  frmPassw = form(this.objPassw, (s)=> {
    required(s.passw, { message: 'Usuario es requerido'});
    required(s.passwN, { message: 'Contraseña es requerida'});   //Cumple con ciertos criterios   May minusc tama_min, caratEsp  //Comparar con contraseña nueva que sean iguales
    required(s.passwR, { message: 'Contraseña es requerida'});   //Comparar con contraseña nueva que sean iguales    
    
  },
  {
    submission: {
      action: async f => {
        console.log(f().value());
        this.changePassw(f().value())

      }
    }
  });  

changePassw(datos : PasswForm) {
    this.srvUsuario.changePassword(this.srvAuth.userActualS().cedula, {passw: datos.passw, passwN: datos.passwN })
      .subscribe({
        next: (res) => {
          console.log('hoy', res);

            alert("Contraseña cambiada");
            this.dialogRef.close();
            this.router.navigate(['/home']);

        },
        error: (error) => {
          this.mostrarError.set(true);
          console.error('Fallo de autenteicación', error);
        }
      })
}  
}
