import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/about', pathMatch: 'full' },
    { path: 'about', loadComponent: () => import('./features/functionalities/functionalities-list/functionalities-list').then(m => m.FunctionalitiesList) },
];
