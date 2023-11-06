import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AutenticacaoGuard, RequisicaoComUsuario } from '../autenticacao/autenticacao.guard';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PedidoService } from './pedido.service';

@UseGuards(AutenticacaoGuard)
@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async create(
    @Req() req: RequisicaoComUsuario,
    @Body() createPedidoDto: CreatePedidoDto
  ) {
    const usuarioId = req.usuario.sub;
    const pedido = await this.pedidoService.create(usuarioId, createPedidoDto);

    return {
      mensagem: 'Pedido feito com sucesso',
      pedido
    }
  }

  @Get()
  async buscaPedidosDoUsuario(@Req() req: RequisicaoComUsuario) {
    const usuarioId = req.usuario.sub;
    const pedidos = await this.pedidoService.buscaPedidosDoUsuario(usuarioId);
    return pedidos;
  }

  @Get('/:id')
  async buscaPorId(
    @Param('id') id: string
  ) {
    const pedido = await this.pedidoService.buscaPedidoPorId(id);
    return pedido;
  }

  @Patch('/:id')
  async atualizaPedido(
    @Req() req: RequisicaoComUsuario,
    @Param('id') pedidoId: string,
    @Body() dadosAtualizacao: UpdatePedidoDto
  ) {
    const usuarioId = req.usuario.sub;
    return await this.pedidoService.atualizaPedido(pedidoId, dadosAtualizacao, usuarioId);
  }
}
