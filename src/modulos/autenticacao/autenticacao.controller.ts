import { Body, Controller, Post } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticaDto } from './dto/autentica.dto';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Post('login')
  create(@Body() { email, senha }: AutenticaDto) {
    return this.autenticacaoService.login(email, senha);
  }
}
