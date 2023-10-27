import { Produto } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class ProdutoEntity implements Produto {
  id: string;
  nome: string;
  valor: Decimal;
  quantidadeDisponivel: Decimal;
  descricao: string;
  categoria: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
