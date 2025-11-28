// src/app/features/authentication/services/autenticacion.service.ts
// cambie a que ahora los datos se guarden en local storage

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { RegistroRequest, RegistroResponse } from '../../../core/models/registro.model';
import { ApiResponse } from '../../../core/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private usuariosRegistrados: { email: string; idUsuario: string }[] = [];

  constructor() {
    this.cargarDesdeLocalStorage();

    if (this.usuariosRegistrados.length === 0) {
      this.usuariosRegistrados.push({ email: 'ana@example.com', idUsuario: 'user-ana' });
      this.usuariosRegistrados.push({ email: 'pedro99@example.org', idUsuario: 'user-pedro' });
      this.guardarEnLocalStorage();
    }
  }

  registrarUsuario(request: RegistroRequest): Observable<ApiResponse<RegistroResponse>> {
    return of(null).pipe(
      delay(1000),
      map(() => {
        if (this.usuariosRegistrados.some(u => u.email === request.email)) {
          throw {
            exito: false,
            mensaje: 'El email ya está en uso',
            errores: { email: ['El email ya está en uso'] }
          } as ApiResponse<RegistroResponse>;
        }

        const nuevoId = 'user-' + Math.random().toString(36).substring(2, 9);
        this.usuariosRegistrados.push({ email: request.email, idUsuario: nuevoId });

        this.guardarEnLocalStorage();

        return {
          exito: true,
          mensaje: 'Registro exitoso',
          datos: {
            idUsuario: nuevoId,
            email: request.email,
            tokenAcceso: 'dummy-jwt-token-' + nuevoId
          }
        } as ApiResponse<RegistroResponse>;
      })
    );
  }

  verificarEmailUnico(email: string): Observable<boolean> {
    return of(!this.usuariosRegistrados.some(u => u.email === email)).pipe(
      delay(500)
    );
  }

  private guardarEnLocalStorage() {
    localStorage.setItem('usuariosRegistrados', JSON.stringify(this.usuariosRegistrados));
  }

  private cargarDesdeLocalStorage() {
    const data = localStorage.getItem('usuariosRegistrados');
    if (data) {
      this.usuariosRegistrados = JSON.parse(data);
    }
  }
}
