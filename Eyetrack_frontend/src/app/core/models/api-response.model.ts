// src/app/core/models/api-response.model.ts
export interface ApiResponse<T> {
  exito: boolean;
  mensaje: string;
  datos?: T;
  errores?: { [key: string]: string[] };
}