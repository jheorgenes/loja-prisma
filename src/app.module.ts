import { ConsoleLogger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AutenticacaoModule } from './modulos/autenticacao/autenticacao.module';
import { PedidoModule } from './modulos/pedido/pedido.module';
import { ProdutoModule } from './modulos/produto/produto.module';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { APP_FILTER } from '@nestjs/core';
import { FiltroDeExcecaoGlobal } from './recursos/filters/filtro-de-excecao-global';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsuarioModule,
    ProdutoModule,
    PedidoModule,
    AutenticacaoModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FiltroDeExcecaoGlobal
    },
    ConsoleLogger //Filtro Nativo do @nestjs/common para registro de logs.
  ],
})
export class AppModule {}
