import { Injectable, NotFoundException } from "@nestjs/common";
import { ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UsuarioService } from "../usuario.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailEhUnicoValidador implements ValidatorConstraintInterface {

  constructor(private usuarioService: UsuarioService) {}

  async validate(value: any): Promise<boolean> {
    try {
      // Se retornar false, significa que já tem usuário com e-mail cadastrado
      const usuarioComEmailExiste = await this.usuarioService.findUsuarioByEmail(value);

      // Se retornar false aqui, significa que passou na validação
      return !usuarioComEmailExiste;
    } catch (error) {
      if(error instanceof NotFoundException) {
        return true;
      }

      throw error;
    }
  }

}

// Exportando a Anotation
export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
  // Recebe a Classe onde a anotation foi invocada e a propriedade (atributo) anotado
  return (objeto: Object, propriedade: string) => {
    // Registra o decorator
    registerDecorator({
      // Envia o construtor como target
      target: objeto.constructor,
      // Coleta a propriedade
      propertyName: propriedade,
      // Informa qual é a opção de validação do ValidationOptions que será executada
      options: opcoesDeValidacao,
      // Se houver constraints, informe na lista
      constraints: [],
      // Informa qual será a validação (que no caso é a classe acima definida)
      validator: EmailEhUnicoValidador
    })
  }
}