import { Usuario } from '@prisma/client';
export class UsuarioEntity implements Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
