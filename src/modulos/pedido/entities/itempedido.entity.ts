import { ItemPedido } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class ItemPedidoEntity implements ItemPedido {
  id: string;
  quantidade: Decimal;
  precoVenda: Decimal;
  pedidoId: string;
  produtoId: string;
}