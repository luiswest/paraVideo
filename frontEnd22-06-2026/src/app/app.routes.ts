import { Routes } from '@angular/router';
import { authGuard } from './shared/helpers/guards/auth-guard';
import { Roles } from './shared/helpers/interfaces/roles';
export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home',
        canActivate: [authGuard], data: {roles: [Roles.Admin, Roles.Cliente, Roles.Mecanico, Roles.Oficinista]},  //Todos los roles
        loadComponent: () => import('./components/home/home')
        .then(m => m.Home)},
    
    { path: 'cliente', 
        canActivate: [authGuard], data: {roles: [Roles.Admin, Roles.Oficinista, Roles.Cliente] }, 
        loadComponent: () => import('./components/cliente/cliente').then(m => m.Cliente)},
        
    { path: 'mecanico', loadComponent: () => import ('./components/mecanico/mecanico')
        .then(m => m.Mecanico)
    },
    { path: 'login', 
        loadComponent: () => import ('./components/login/login')
        .then(m => m.Login)
    },
    { path: 'changePassw', 
        canActivate: [authGuard], data: {roles: [Roles.Admin, Roles.Cliente, Roles.Mecanico, Roles.Oficinista]},  //Todos los roles
        loadComponent: () => import ('./components/change-passw/change-passw')
        .then(m => m.ChangePassw)
    },
    { path: 'error403', loadComponent: () => import ('./components/forms/error403/error403')
        .then(m => m.Error403)
    }    
];
