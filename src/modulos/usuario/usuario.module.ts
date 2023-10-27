import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsuarioRepository } from './usuario.repository';
import { EmailEhUnicoValidador } from './validation/email-eh-unico.validator';

@Module({
  controllers: [UsuarioController],
  providers: [
    UsuarioService,
    PrismaService,
    UsuarioRepository,
    EmailEhUnicoValidador
  ],
  exports: [UsuarioService]
})
export class UsuarioModule {}
