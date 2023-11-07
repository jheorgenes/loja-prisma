import { CallHandler, ConsoleLogger, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Request, Response } from "express";
import { Observable, tap } from "rxjs";
import { RequisicaoComUsuario } from "src/modulos/autenticacao/autenticacao.guard";

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {

  constructor(private logger: ConsoleLogger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextHttp = context.switchToHttp();
    const request = contextHttp.getRequest<Request | RequisicaoComUsuario>();
    const { path, method } = request;

    const response = contextHttp.getResponse<Response>();
    const { statusCode } = response;

    this.logger.log(`${method} ${path}`);
    const instantePreControlador = Date.now();

    return next.handle().pipe(tap(() => {
      if('usuario' in request) {
        this.logger.log(`Rota acessada pelo usuário: ${request.usuario.sub}`);
      }
      const tempodeExecucaodaRota = Date.now() - instantePreControlador;
      this.logger.log(`Resposta: status ${statusCode} = ${tempodeExecucaodaRota}ms`);
    }));
  }

}
