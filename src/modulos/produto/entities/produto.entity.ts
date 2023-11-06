import { Produto } from "@prisma/client";
import { ProdutoCaracteristicaEntity } from "./produto-caracteristica.entity";
import { ProdutoImagemEntity } from "./produto-imagem.entity";
import { ItemPedidoEntity } from "src/modulos/pedido/entities/itempedido.entity";

export class ProdutoEntity implements Produto {
  id: string;
  nome: string;
  valor: number;
  quantidadeDisponivel: number;
  descricao: string;
  categoria: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  caracteristicas?: ProdutoCaracteristicaEntity[];
  imagens?: ProdutoImagemEntity[];
  itensPedido?: ItemPedidoEntity[];
}
