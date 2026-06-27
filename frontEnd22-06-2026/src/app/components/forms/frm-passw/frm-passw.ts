import { Component, signal, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormField, FormRoot, form, minLength, min, required, validate } from '@angular/forms/signals';
import { MatInput } from "@angular/material/input";
import { MatDialogRef, MatDialogClose, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SrvUsuario } from '../../../shared/services/usuario.service';
import { AuthService } from '../../../shared/services/auth.service';
import { DialogoGeneral } from '../dialogo-general/dialogo-general';
interface PasswForm {
    passw : string;
    passwN : string;
    passwR : string;        
}

@Component({
  selector: 'app-frm-passw',
  imports: [MatCardModule, MatIconModule, MatButtonModule,
    MatFormFieldModule, MatFormField, FormRoot, MatInput, FormField, MatDialogClose],
  templateUrl: './frm-passw.html',
  styleUrl: './frm-passw.css',
})
export class FrmPassw {
  dialogRef = inject(MatDialogRef<FrmPassw>)
  private readonly router = inject(Router);
  private readonly srvUsuario = inject(SrvUsuario);
  
  private readonly srvAuth = inject(AuthService);

  public mostrarError = signal(false);
  
  private readonly dialog = inject(MatDialog);

  hide = signal(true);

  objPassw = signal<PasswForm>( {
    passw: '',
    passwN: '',
    passwR: ''
  });

  frmPassw = form(this.objPassw, (s)=> {
    required(s.passw, { message: 'Usuario es requerido'});
    required(s.passwN, { message: 'Contraseña es requerida'});   //Cumple con ciertos criterios   May minusc tama_min, caratEsp  //Comparar con contraseña nueva que sean iguales
    minLength(s.passwN, 8, { message: 'Contraseña debe tener al menos 8 caracteres'});   //Cumple con ciertos criterios   May minusc tama_min, caratEsp  //Comparar con contraseña nueva que sean iguales    
    required(s.passwR, { message: 'Contraseña es requerida'});   //Comparar con contraseña nueva que sean iguales
    
    validate(s.passwR, (ctx) => {
      const passwR = ctx.value();
      const passwN = ctx.valueOf(s.passwN);
      if (passwR === passwN) return null;
      return {
        kind: 'errorConfirmacion',
        message: 'Nueva contraseña y confirmación no coinciden'
      }
    });
     validate(s.passwN, (ctx) => {
      const valor = ctx.value();
      if (!valor) return null;
      const hasUpperCase = /[A-Z]+/.test(valor);
      const hasLowerCase = /[a-z]+/.test(valor);
      const hasNumber = /[0-9]+/.test(valor);
      const hasSpecial = /[#-&*@]+/.test(valor);
      if (hasUpperCase && hasLowerCase && hasNumber && hasSpecial) {
        return null;
      }
      return {
        kind: 'errorPasswordStrenght',
        message: 'Contraseña debe contenedor mayúscula, minúscula, digito, y almenos un caracter especial (#$%$*@)'
      }
    }); 
  },
  {
    submission: {
      action: async f => {
        console.log(f().value());
        this.changePassw(f().value())

      }
    }
  });  
  toggleVisibility(event: MouseEvent) {
    event.preventDefault(); // Evita que el botón envíe el formulario
    this.hide.update(value => !value);
  }

changePassw(datos : PasswForm) {
    this.srvUsuario.changePassword(this.srvAuth.userActualS().cedula, {passw: datos.passw, passwN: datos.passwN })
      .subscribe({
        next: () => {
//---------
              this.dialog.open(DialogoGeneral, {
                data : {
                  texto : 'Contraseña Cambiada de forma correcta',
                  icono : 'check',
                  textoAceptar : ' Aceptar '
                }
              });
//---------

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
