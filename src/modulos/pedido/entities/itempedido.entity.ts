import { ItemPedido } from "@prisma/client";

export class ItemPedidoEntity implements ItemPedido {
  id: string;
  quantidade: number;
  precoVenda: number;
  pedidoId: string;
  produtoId: string;
}
