import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Cliente } from './components/cliente/cliente';

export const routes: Routes = [
/*     {path: '', loadComponent: () => import('./components/home/home')
        .then(m => m.Home)}, */
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'cliente', component :Cliente},
    {path: 'home', component :Home}
];
/*
import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard], // Guard runs before loading
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) // Lazily loads code
  }
];
*/