// import { Usuario } from '@prisma/client';
import { Prisma } from '@prisma/client';
export class UsuarioEntity implements Prisma.UsuarioUncheckedCreateInput {
  id?: string;
  nome: string;
  email: string;
  senha: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  deletedAt?: string | Date;
  pedidos?: Prisma.PedidoCreateNestedManyWithoutUsuarioInput;

  // id: string;
  // nome: string;
  // email: string;
  // senha: string;
  // createdAt: Date;
  // updatedAt: Date;
  // deletedAt: Date;
}
