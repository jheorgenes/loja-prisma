import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AutenticacaoGuard, RequisicaoComUsuario } from '../autenticacao/autenticacao.guard';
import { CreatePedidoDto } from './dto/create-pedido.dto';
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

    // return {
    //   mensagem: 'Pedido feito com sucesso',
    //   pedido
    // }
  }
}
