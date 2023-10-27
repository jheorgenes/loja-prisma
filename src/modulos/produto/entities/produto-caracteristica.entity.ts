import { ProdutoCaracteristicas } from "@prisma/client";

export class ProdutoCaracteristicaEntity implements ProdutoCaracteristicas {
  id: string;
  nome: string;
  descricao: string;
  produtoId: string;
}