// src/app/features/authentication/authentication.routes.ts
import { Routes } from '@angular/router';
import { RegistroPageComponent } from './pages/registro-page/registro-page.component';

export const AUTHENTICATION_ROUTES: Routes = [
  { path: 'registro', component: RegistroPageComponent },
  // Aquí se pueden añadir otras rutas de autenticación (login, recuperación, etc.)
];