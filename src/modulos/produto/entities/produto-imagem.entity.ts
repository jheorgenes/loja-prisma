import { ProdutoImagens } from "@prisma/client";

export class ProdutoImagemEntity implements ProdutoImagens {
  id: string;
  url: string;
  descricao: string;
  produtoId: string;
}