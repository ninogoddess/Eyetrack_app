// src/app/core/models/registro.model.ts
export interface RegistroRequest {
  email: string;
  contrasena: string;
  tipoUsuario: 'lector' | 'creador'; // Opcional, si se necesitara en el payload
}

export interface RegistroResponse {
  idUsuario: string;
  email: string;
  tokenAcceso: string;
}