// src/app/features/authentication/components/formulario-registro/formulario-registro.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from '../../services/authentication.services';
import { ValidadoresPersonalizados } from '../../../../../app/core/utils/validadores';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-registro.component.html'
})
export class FormularioRegistroComponent implements OnInit {
  formularioRegistro!: FormGroup;
  mensajeError: string | null = null;
  registroExitoso: boolean = false;
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private autenticacionService: AutenticacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formularioRegistro = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email],
        // Validador asíncrono para email único. Pasa el servicio para que pueda hacer la verificación.
        [ValidadoresPersonalizados.emailUnico(this.autenticacionService)]
      ],
      contrasena: [
        '',
        [Validators.required, ValidadoresPersonalizados.contrasenaFuerte()]
      ],
      confirmarContrasena: [
        '',
        [Validators.required]
      ]
    }, { validators: this.confirmarContrasenaValidator });
  }

  // Validador de grupo para confirmar contraseña
  confirmarContrasenaValidator(form: FormGroup): { [key: string]: boolean } | null {
    const contrasena = form.get('contrasena');
    const confirmarContrasena = form.get('confirmarContrasena');

    if (contrasena && confirmarContrasena && contrasena.value !== confirmarContrasena.value) {
      confirmarContrasena.setErrors({ 'noCoinciden': true });
      return { 'contrasenasNoCoinciden': true };
    } else if (confirmarContrasena && confirmarContrasena.hasError('noCoinciden')) {
      confirmarContrasena.setErrors(null);
    }
    return null;
  }

  get email() {
    return this.formularioRegistro.get('email');
  }

  get contrasena() {
    return this.formularioRegistro.get('contrasena');
  }

  get confirmarContrasena() {
    return this.formularioRegistro.get('confirmarContrasena');
  }

  async onSubmit() {
    this.mensajeError = null;
    this.registroExitoso = false;

    if (this.formularioRegistro.pending) {
      // Esperar a que los validadores asíncronos terminen
      this.cargando = true;
      await new Promise(resolve => setTimeout(resolve, 100)); // Pequeña espera para ciclo de Angular
      if (this.formularioRegistro.pending) {
        // Si aún está pendiente después de un pequeño tiempo, significa que el validador asíncrono está en curso
        // Podríamos mostrar un spinner o deshabilitar el botón
        console.log('Esperando validación asíncrona...');
        // Opcional: Podríamos reintentar el submit o esperar un evento de estado del validador.
        // Para este ejemplo, simplemente no haremos nada y el botón deshabilitado actuará como feedback.
        this.cargando = false;
        return;
      }
    }

    if (this.formularioRegistro.invalid) {
      this.formularioRegistro.markAllAsTouched();
      this.mensajeError = 'Por favor, corrige los errores del formulario.';
      return;
    }

    this.cargando = true;
    try {
      const { email, contrasena } = this.formularioRegistro.value;
      this.autenticacionService.registrarUsuario({ email, contrasena, tipoUsuario: 'lector' })
        .subscribe({
          next: (response) => {
            this.cargando = false;
            if (response.exito) {
              this.registroExitoso = true;
              console.log('Registro exitoso:', response.datos);
              // Simular redirección al panel
              setTimeout(() => {
                alert('¡Registro exitoso! Redirigiendo al panel.');
                this.router.navigate(['/panel']); // Redirigir a una ruta dummy
              }, 2000);
            } else {
              this.mensajeError = response.mensaje;
            }
          },
          error: (error) => {
            this.cargando = false;
            if (error && error.mensaje) {
              this.mensajeError = error.mensaje;
            } else {
              this.mensajeError = 'Ocurrió un error inesperado al registrar el usuario.';
            }
            console.error('Error en el registro:', error);
          }
        });
    } catch (error) {
      this.cargando = false;
      this.mensajeError = 'Ocurrió un error al procesar la solicitud.';
      console.error('Error al enviar formulario:', error);
    }
  }
}