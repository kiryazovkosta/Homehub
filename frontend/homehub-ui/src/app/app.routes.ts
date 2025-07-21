import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/about', pathMatch: 'full' },
    { path: 'about', loadComponent: () => import('./features/common/about/about-section').then(m => m.AboutSection) },
    { path: 'family', loadComponent: () => import('./features/common/family/family').then(m => m.Family) },
    { path: 'login', loadComponent: () => import('./auth/login/login').then(m => m.Login) },
    { path: 'register', loadComponent: () => import('./auth/register/register').then(m => m.Register) },
    { path: 'finances', loadComponent: () => import('./features/finances/finances-list/finances-list').then(m => m.FinancesList) },
    { path: 'contact', loadComponent: () => import('./shared/components/contact-form/contact-form').then(m => m.ContactForm) },
];
