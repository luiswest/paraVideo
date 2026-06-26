import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from './shared/services/auth.service';

type MenuItem = {
  label : string;
  icon : string;
  route : string;
  rol : number[];
}
@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterModule, 
    MatToolbarModule, MatMenuModule, MatSidenavModule, MatCheckboxModule, 
    MatFormFieldModule, MatIconModule, MatDividerModule, MatListModule,
    MatTableModule, MatTooltipModule
     ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('frontend');
  protected readonly authService = inject(AuthService);
  menuItems = signal<MenuItem[]>([
    {label: 'Inicio', icon: 'home', route:'home', rol :[0, 1 , 2, 3]},
    {label: 'Clientes', icon: 'group', route:'cliente', rol : [0, 1, 3]},
    {label: 'Mecánicos', icon: 'engineering', route:'mecanico', rol :[0, 1]},
    {label: 'Vehículos', icon: 'directions_car', route:'vehiculo', rol :[0, 1]},
    {label: 'Servicios', icon: 'build', route: 'servicio', rol: [0, 1, 2]}
  ]);
  @HostListener("window:beforeunload") unloadHandler() {
    this.logOut()
  }
  logOut(){
    this.authService.logout();
  }
}
