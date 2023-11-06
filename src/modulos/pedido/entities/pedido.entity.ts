import { $Enums, Pedido } from "@prisma/client";
import { ItemPedidoEntity } from "./itempedido.entity";

export class PedidoEntity implements Pedido {
  id: string;
  valorTotal: number;
  status: $Enums.StatusPedido;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  usuarioId: string;
  itensPedido: ItemPedidoEntity[];
}
