// src/app/features/authentication/pages/registro-page/registro-page.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioRegistroComponent } from '../../components/formulario-registro/formulario-registro.component';

@Component({
  selector: 'app-registro-page',
  standalone: true,
  imports: [CommonModule, FormularioRegistroComponent],
  template: `
    <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <app-formulario-registro></app-formulario-registro>
    </div>
  `
})
export class RegistroPageComponent {}