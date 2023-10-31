import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

export interface UsuarioPayload {
  sub: string,
  nomeUsuario: string
}

@Injectable()
export class AutenticacaoService {

  constructor(
    private readonly usuarioService: UsuarioService,
    private jwtService: JwtService
  ) {}

  async login(email: string, senha: string) {

    const usuario = await this.usuarioService.findUsuarioByEmail(email);

    const usuarioAutenticado = await bcrypt.compare(senha, usuario.senha);

    if(!usuarioAutenticado) {
      throw new UnauthorizedException('O email ou a senha estão incorretos');
    }

    const payload: UsuarioPayload = {
      sub: usuario.id,
      nomeUsuario: usuario.nome
    }

    return {
      token_acesso: await this.jwtService.signAsync(payload)
    }
  }
}
