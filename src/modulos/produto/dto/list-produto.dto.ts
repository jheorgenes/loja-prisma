class ListCaracteristicasProdutoDto {
  nome: string;
  descricao: string;
}

class ListImagensProdutoDto {
  url: string;
  descricao: string;
}

export class ListProdutoDto {
  constructor(
    readonly id: string,
    readonly nome: string,
    readonly quantidadeDisponivel: number,
    readonly caracteristicas: ListCaracteristicasProdutoDto[],
    readonly imagens: ListImagensProdutoDto[]
  ) {}
}
