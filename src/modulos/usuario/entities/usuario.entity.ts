import { Usuario } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { PedidoEntity } from 'src/modulos/pedido/entities/pedido.entity';
export class UsuarioEntity implements Usuario {
  id: string;
  nome: string;
  email: string;
  @Exclude()
  senha: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  pedidos?: PedidoEntity[];
}
