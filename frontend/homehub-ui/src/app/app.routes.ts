import { Routes } from '@angular/router';
import { guestGuard, authGuard, roleGuard } from './core/guards';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/about', 
        pathMatch: 'full' 
    },
    { 
        path: 'about', 
        loadComponent: () => import('./features').then(m => m.FunctionalitiesList) 
    },
    { 
        path: 'login', 
        loadComponent: () => import('./auth').then(m => m.Login),
        canActivate: [guestGuard]
    },
    { 
        path: 'register', 
        loadComponent: () => import('./auth').then(m => m.Register), 
        canActivate: [guestGuard]
    },
    { 
        path: 'logout', 
        loadComponent: () => import('./auth').then(m => m.Login),
        canActivate: [authGuard]
    },
    { 
        path: 'profile', 
        loadComponent: () => import('./auth').then(m => m.Register), 
        canActivate: [authGuard]
    },




    { 
        path: 'contact', 
        loadComponent: () => import('./features').then(m => m.ContactForm), 
        canActivate: [authGuard]
    },

    { 
        path: 'management', 
        loadComponent: () => import('./features').then(m => m.ContactForm), 
        canActivate: [roleGuard],
        data: { role: 'Administrator' }
    },
];
