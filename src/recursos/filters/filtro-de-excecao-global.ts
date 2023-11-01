import { ArgumentsHost, Catch, ConsoleLogger, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class FiltroDeExcecaoGlobal implements ExceptionFilter {

  constructor(
    private adapterHost: HttpAdapterHost, //Serviço para manipular os dados da Requisição
    private loggerNativo: ConsoleLogger //ConsoleLogger nativo do @nestjs/common
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    // Gerando Logs dos erros que ocorreram na requisição
    this.loggerNativo.error(exception);
    console.error(exception);

    const { httpAdapter } = this.adapterHost;

    const context = host.switchToHttp();
    const response = context.getResponse<any>();
    const request = context.getRequest<any>();

    if('usuario' in request) {
      this.loggerNativo.log(`Rota acessada pelos usuários ${request.usuario.sub}`);
    }

    const { status, body } = exception instanceof HttpException ?
      {
        status: exception.getStatus(),
        body: exception.getResponse(),
      } : {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        body: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          timestamp: new Date().toISOString(),
          path: httpAdapter.getRequestUrl(request)
        }
      }

    // Retorna uma resposta
    httpAdapter.reply(response, body, status);
  }

}
