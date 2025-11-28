// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AUTHENTICATION_ROUTES } from './features/authentication/authentication.routes';
import { RegistroPageComponent } from './features/authentication/pages/registro-page/registro-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'registro', pathMatch: 'full' },
  { path: 'registro', component: RegistroPageComponent }, // Directamente en las rutas principales por simplicidad de la HU
  {
    path: 'auth',
    loadChildren: () => import('./features/authentication/authentication.routes').then(m => m.AUTHENTICATION_ROUTES)
  },
  { path: 'panel', component: RegistroPageComponent } // Ruta dummy para la redirección
];