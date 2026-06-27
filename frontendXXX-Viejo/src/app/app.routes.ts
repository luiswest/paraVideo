import { Routes } from '@angular/router';
import { Cliente } from './components/cliente/cliente';
import { authGuard } from './shared/helpers/guards/auth-guard';

export const routes: Routes = [
    {path: 'home', 
      canActivate: [authGuard],
      loadComponent: () => import('./components/home/home')
        .then(m => m.Home)},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'login',
      loadComponent: () => import('./components/login/login').then(m => m.Login)
    },
    {path: 'cliente', 
        canActivate: [authGuard],
        component :Cliente},
    
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