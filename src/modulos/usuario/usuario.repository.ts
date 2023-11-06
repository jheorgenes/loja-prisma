import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UsuarioEntity } from "./entities/usuario.entity";

@Injectable()
export class UsuarioRepository {

  constructor(private readonly prisma: PrismaService) {}

  async create(usuario: UsuarioEntity): Promise<UsuarioEntity> {
    return this.prisma.usuario.create({
      data: {
        ...usuario,
        pedidos: {
          connect: []
        }
      }
    });
  }

  async findAll(): Promise<UsuarioEntity[]> {
    return this.prisma.usuario.findMany();
  }

  async existsWithEmail(email: string) {
    return await this.prisma.usuario.findFirst({
      where: {
        email
      }
    });
  }

  async findById(id: string): Promise<UsuarioEntity> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id }
    });

    if(!usuario) {
      throw new Error(`Usuário com id ${id} não encontrado`);
    }

    return usuario;
  }

  async update(id: string, updateData: Partial<UsuarioEntity>): Promise<UsuarioEntity> {
    await this.findById(id);

    return this.prisma.usuario.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
        pedidos: {
          connect: []
        }
      }
    })

    // Object
    //   .entries(updateData)
    //   .forEach(([key, value]) => {
    //     if(key === 'id') {
    //       return;
    //     }

    //     usuario[key] = value;
    //   });
  }

  async delete(id: string) {
    await this.findById(id);

    return await this.prisma.usuario.delete({
      where: { id }
    });
  }
}
