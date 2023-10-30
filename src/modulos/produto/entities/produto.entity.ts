import { Produto } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { ProdutoCaracteristicaEntity } from "./produto-caracteristica.entity";
import { ProdutoImagemEntity } from "./produto-imagem.entity";

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
  caracteristicas?: ProdutoCaracteristicaEntity[];
  imagens?: ProdutoImagemEntity[];
}
