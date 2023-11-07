import { ClassSerializerInterceptor, ConsoleLogger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AutenticacaoModule } from './modulos/autenticacao/autenticacao.module';
import { PedidoModule } from './modulos/pedido/pedido.module';
import { ProdutoModule } from './modulos/produto/produto.module';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FiltroDeExcecaoGlobal } from './recursos/filters/filtro-de-excecao-global';
import { LoggerGlobalInterceptor } from './recursos/interceptors/logger-global/logger-global.interceptor';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    // Cache usando propriedades nativas do nestjs
    // CacheModule.register({ //Apontando para realizar registros
    //   isGlobal: true, // De forma global
    //   ttl: 10000 //guardando na memória as informações pelo tempo determinado em ttl
    // }),
    CacheModule.registerAsync({ //Cache configurando de forma assíncrona
      useFactory: async () => ({
        store: await redisStore( //Usando 'Redis' para armazenar os caches
          {
            ttl: 100 * 1000
          }
        )
      }),
      isGlobal: true
    }),
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
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerGlobalInterceptor
    },
    ConsoleLogger //Filtro Nativo do @nestjs/common para registro de logs.
  ],
})
export class AppModule {}
