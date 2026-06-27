import { Component, inject, signal } from '@angular/core';
import { form, FormField, FormRoot, pattern, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginForm } from '../../../shared/interfaces/tipo-login';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-frm-login',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, 
    FormField, FormRoot ],
  templateUrl: './frm-login.html',
  styleUrl: './frm-login.css',
})
export class FrmLogin {
  router = inject(Router);
  srvLogin = inject(AuthService);
  dialogRef = inject(MatDialogRef<FrmLogin>);

  _obj = signal<LoginForm>({
    cedula: '',
    passw: '',
  });
  _form = form(this._obj, (s)=> {
    required(s.cedula, { message: 'Username is required' });
    required(s.passw, { message: 'Password is required' });
    
  },
  { submission: {
       action: async f => {
          const value = f().value();
          this.login(f().value());
          console.log(value);

       }
        
  } }
);
  
  get form() {
    return this._obj();
  }
  login(datos : LoginForm) {
    this.srvLogin.login(datos)
      .subscribe({
        next: (response) => {
          // Handle successful login, e.g., navigate to dashboard, store token, etc.
          console.log('Login successful:', response);
          this.dialogRef.close();

        },
        error: (error) => {
          // Handle login error, e.g., show error message to user
          console.error('Login failed:', error);
        },
        complete: () => {
          console.log("Logueado");
          

        }
      });   
  }
/*   onSubmit() {
    // Handle form submission logic here
    event?.preventDefault(); // Prevent default form submission behavior

    console.log('Form submitted:', this._form().value());
    this.srvLogin.login(this._form().value())
      .subscribe({
        next: (response) => {
          // Handle successful login, e.g., navigate to dashboard, store token, etc.
          console.log('Login successful:', response);
        },
        error: (error) => {
          // Handle login error, e.g., show error message to user
          console.error('Login failed:', error);
        }
      });
  }  */

}
