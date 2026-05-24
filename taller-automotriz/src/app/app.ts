import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Clientes } from './components/clientes/clientes';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, Clientes,
    MatIconModule,
    MatSidenavContainer, MatSidenavModule, MatCheckboxModule,
    MatFormFieldModule, MatMenuModule, MatDividerModule, 
    MatListModule, MatTableModule
      
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('taller-automotriz');
  

}
