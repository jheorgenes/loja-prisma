import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ItemPedidoEntity } from "./entities/itempedido.entity";
import { PedidoEntity } from "./entities/pedido.entity";

@Injectable()
export class PedidoRepository {

  constructor(
    private readonly prisma: PrismaService
  ) {}

  async createPedido(pedido: PedidoEntity, itensPedido: ItemPedidoEntity[]){
    return this.prisma.pedido.create({
      data: {
        ...pedido,
        itensPedido: {
          create: itensPedido
        }
      },
      include: {
        itensPedido: true,
        usuario: true
      }
    });
  }

  async findAllByUsuario(usuarioId: string) {
    return this.prisma.pedido.findMany({
      where: {
        usuarioId
      },
      include: {
        usuario: true,
        itensPedido: true
      }
    });
  }

  async findById(id: string) {
    return this.prisma.pedido.findUnique({
      where: {
        id
      },
      include: {
        usuario: true,
        itensPedido: true
      }
    });
  }

  async update(id: string, pedido: PedidoEntity, itemPedido: ItemPedidoEntity[]) {
    return this.prisma.pedido.update({
      where: {
        id
      },
      data: {
        ...pedido,
        itensPedido: {
          connect: itemPedido
        }
      }
    })
  }
}
