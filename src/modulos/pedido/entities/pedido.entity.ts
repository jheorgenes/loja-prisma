import { $Enums, Pedido } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class PedidoEntity implements Pedido {
  id: string;
  valorTotal: Decimal;
  status: $Enums.StatusPedido;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  usuarioId: string;
}
