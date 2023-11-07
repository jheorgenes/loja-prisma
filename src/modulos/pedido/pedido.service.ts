import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { StatusPedido } from '@prisma/client';
import { ProdutoEntity } from '../produto/entities/produto.entity';
import { ProdutoRepository } from '../produto/produto.repository';
import { UsuarioEntity } from '../usuario/entities/usuario.entity';
import { UsuarioRepository } from '../usuario/usuario.repository';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { ItemPedidoEntity } from './entities/itempedido.entity';
import { PedidoEntity } from './entities/pedido.entity';
import { PedidoRepository } from './pedido.repository';

@Injectable()
export class PedidoService {

  constructor(
    private pedidoRepository: PedidoRepository,
    private usuarioRepository: UsuarioRepository,
    private produtoRepository: ProdutoRepository
  ) {}

  private trataDadosDoPedido(dadosPedido: CreatePedidoDto, produtosRelacionados: ProdutoEntity[]) {
    dadosPedido.itensPedido.forEach((itemPedido) => {

      const produtoRelacionado = produtosRelacionados.find((produto) => produto.id === itemPedido.produtoId);

      if(produtoRelacionado === undefined) {
        throw new NotFoundException(`O produto com id ${itemPedido.produtoId} não foi encontrado`);
      }

      if(itemPedido.quantidade > produtoRelacionado.quantidadeDisponivel) {
        throw new BadRequestException(`A quantidade solicitada (${itemPedido.quantidade}) é maior do que a disponível (${produtoRelacionado.quantidadeDisponivel}) para o produto ${produtoRelacionado.nome}`);
      }
    });
  }

  async create(usuarioId: string, dadosPedido: CreatePedidoDto) {
    const usuario: UsuarioEntity = await this.usuarioRepository.findById(usuarioId);

    const produtosIds = dadosPedido.itensPedido.map((itemPedido) => itemPedido.produtoId);

    const produtosRelacionados = await this.produtoRepository.findManyByIds(produtosIds);

    const pedidoEntity = new PedidoEntity();
    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
    pedidoEntity.usuarioId = usuario.id;

    this.trataDadosDoPedido(dadosPedido, produtosRelacionados);

    //Aguarda todas as promessas serem executadas
    const itensPedidoEntidades = await Promise.all(dadosPedido.itensPedido.map(
      async (itemPedido) => {
        const produtoRelacionado = produtosRelacionados.find((produto: ProdutoEntity) => produto.id === itemPedido.produtoId);

        const itemPedidoEntity = new ItemPedidoEntity();
        itemPedidoEntity.produtoId = produtoRelacionado!.id;
        itemPedidoEntity.precoVenda = produtoRelacionado!.valor;
        itemPedidoEntity.quantidade = itemPedido.quantidade;

        //Atualiza a quantidade de estoque da entidade Produto
        await this.produtoRepository.atualizaQuantidadeProduto(produtoRelacionado.id, itemPedido.quantidade);

        return itemPedidoEntity;
      }
    ));

    const valorTotal = itensPedidoEntidades.reduce((total, item) => {
      return total + item.precoVenda * item.quantidade;
    }, 0);

    let listItensPedido = [];
    if(itensPedidoEntidades) {
      for(let item of itensPedidoEntidades) {
        const itemPedidoEntity = new ItemPedidoEntity();
        Object.assign(itemPedidoEntity, item);
        listItensPedido.push(itemPedidoEntity);
      }
    }

    pedidoEntity.valorTotal = valorTotal;
    const pedidoCriado = await this.pedidoRepository.createPedido(pedidoEntity, listItensPedido);
    return pedidoCriado;
  }

  async buscaPedidosDoUsuario(usuarioId: string) {
    await this.usuarioRepository.findById(usuarioId);
    return this.pedidoRepository.findAllByUsuario(usuarioId);
  }

  async buscaPedidoPorId(id: string) {
    return await this.pedidoRepository.findById(id);
  }

  async atualizaPedido(pedidoId: string, dadosAtualizacao: UpdatePedidoDto, usuarioId: string) {
    const pedido = await this.pedidoRepository.findById(pedidoId);

    if(pedido === null) {
      throw new NotFoundException(`O pedido não foi encontrado`);
    }

    if(pedido.usuario.id !== usuarioId) {
      throw new ForbiddenException('Você não tem autorização para atualizar esse pedido');
    }

    const pedidoEntity = new PedidoEntity();
    delete pedido.usuario; //Excluíndo a entidade de usuário relacionado com o pedido para ficar nos conformes do objeto.
    Object.assign(pedidoEntity, pedido);

    pedidoEntity.status = dadosAtualizacao.status;

    return await this.pedidoRepository.update(pedidoId, pedidoEntity, pedidoEntity.itensPedido);
  }
}
