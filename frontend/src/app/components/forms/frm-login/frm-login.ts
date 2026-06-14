import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDivider } from '@angular/material/list';
import { LoginForm } from '../../../shared/interfaces/tipo-login';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-frm-login',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, 
    FormField, JsonPipe, MatDivider, FormRoot],
  templateUrl: './frm-login.html',
  styleUrl: './frm-login.css',
})
export class FrmLogin {
  srvLogin = inject(AuthService);
  
  _obj = signal<LoginForm>({
    cedula: '',
    passw: '',
  });
  _form = form(this._obj, (s)=> {
    required(s.cedula, { message: 'Username is required' });
    required(s.passw, { message: 'Password is required' });
  });
  
  get form() {
    return this._obj();
  }
  onSubmit(event: Event) {
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
  } 

}
