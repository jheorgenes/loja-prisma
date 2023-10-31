import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsuarioPayload } from './autenticacao.service';

export interface RequisicaoComUsuario extends Request {
  usuario: UsuarioPayload;
}

@Injectable()
export class AutenticacaoGuard implements CanActivate {

  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Extraindo o request do tipo RequisicaoComUsuario
    const request = context.switchToHttp().getRequest<RequisicaoComUsuario>();
    const token = this.extrairTokenDoCabecalho(request);

    if(!token) {
      throw new UnauthorizedException('Erro de autenticação');
    }

    try {
      const payload: UsuarioPayload = await this.jwtService.verifyAsync(token);
      request.usuario = payload;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Jwt Inválido');
    }

    return true;
  }

  private extrairTokenDoCabecalho(request: Request): string | undefined {
    const [ tipo, token ] = request.headers.authorization?.split(' ') ?? [];
    return tipo === 'Bearer' ? token: undefined;
  }
}
