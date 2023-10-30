import { StatusPedido } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdatePedidoDto {
  @IsEnum(StatusPedido)
  status: StatusPedido;
}
