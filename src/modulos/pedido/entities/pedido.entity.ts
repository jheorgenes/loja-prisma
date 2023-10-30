import { $Enums, Pedido } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { ItemPedidoEntity } from "./itempedido.entity";

export class PedidoEntity implements Pedido {
  id: string;
  valorTotal: Decimal;
  status: $Enums.StatusPedido;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  usuarioId: string;
  itensPedido: ItemPedidoEntity[];
}
