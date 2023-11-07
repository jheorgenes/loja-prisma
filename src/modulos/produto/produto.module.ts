import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProdutoRepository } from './produto.repository';
import { CustomLoggerModule } from 'src/recursos/interceptors/custom-logger/logger.module';

@Module({
  imports: [CustomLoggerModule],
  controllers: [ProdutoController],
  providers: [
    ProdutoService,
    PrismaService,
    ProdutoRepository
  ],
  exports: [ProdutoService]
})
export class ProdutoModule {}
