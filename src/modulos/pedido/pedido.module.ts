import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PedidoRepository } from './pedido.repository';
import { UsuarioRepository } from '../usuario/usuario.repository';
import { ProdutoRepository } from '../produto/produto.repository';

@Module({
  controllers: [PedidoController],
  providers: [
    PedidoService,
    PrismaService,
    PedidoRepository,
    UsuarioRepository,
    ProdutoRepository
  ],
  exports: [PedidoService]
})
export class PedidoModule {}
