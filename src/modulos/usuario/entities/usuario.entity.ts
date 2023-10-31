import { Usuario } from '@prisma/client';
import { PedidoEntity } from 'src/modulos/pedido/entities/pedido.entity';
export class UsuarioEntity implements Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  // pedidos: PedidoEntity[]
}
