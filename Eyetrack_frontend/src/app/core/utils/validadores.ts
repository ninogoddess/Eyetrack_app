// src/app/core/utils/validadores.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ValidadoresPersonalizados {
  static contrasenaFuerte(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valor = control.value;
      if (!valor) {
        return null; // No validar si está vacío, el validador 'required' se encarga de eso.
      }

      const tieneMayuscula = /[A-Z]+/.test(valor);
      const tieneNumero = /[0-9]+/.test(valor);
      const tieneMinimoCaracteres = valor.length >= 8;

      const errores: ValidationErrors = {};
      if (!tieneMayuscula) {
        errores['sinMayuscula'] = 'La contraseña debe contener al menos una mayúscula.';
      }
      if (!tieneNumero) {
        errores['sinNumero'] = 'La contraseña debe contener al menos un número.';
      }
      if (!tieneMinimoCaracteres) {
        errores['minimoCaracteres'] = 'La contraseña debe tener al menos 8 caracteres.';
      }

      return Object.keys(errores).length ? errores : null;
    };
  }

  // Este validador es para simular la unicidad del email
  static emailUnico(servicioAutenticacion: any): ValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise((resolve) => {
        if (!control.value) {
          return resolve(null);
        }
        // Simular una llamada asíncrona al servicio para verificar unicidad
        servicioAutenticacion.verificarEmailUnico(control.value).subscribe(
          (esUnico: boolean) => {
            resolve(esUnico ? null : { emailYaEnUso: true });
          },
          () => {
            resolve({ errorVerificacionEmail: true }); // En caso de error de red o similar
          }
        );
      });
    };
  }
}