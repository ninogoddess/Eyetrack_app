// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-gray-800 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <a routerLink="/" class="text-white text-xl font-bold">EyeTrack App</a>
        <div>
          <a routerLink="/registro" routerLinkActive="text-blue-400" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Registro</a>
          <!-- Otros enlaces de navegación -->
        </div>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'eyetrack-app';
}