import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/about', pathMatch: 'full' },
    { path: 'about', loadComponent: () => import('./features/functionalities/functionalities-list/functionalities-list').then(m => m.FunctionalitiesList) },
    { path: 'login', loadComponent: () => import('./auth/login/login').then(m => m.Login) },
    { path: 'register', loadComponent: () => import('./auth/register/register').then(m => m.Register) },






    { path: 'contact', loadComponent: () => import('./features/contact-form/contact-form').then(m => m.ContactForm) },
];
