import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UsuarioEntity } from "./entities/usuario.entity";

@Injectable()
export class UsuarioRepository {

  constructor(private readonly prisma: PrismaService) {}

  async create(usuario: UsuarioEntity): Promise<UsuarioEntity> {
    return this.prisma.usuario.create({ data: usuario });
  }

  async findAll(): Promise<UsuarioEntity[]> {
    return this.prisma.usuario.findMany();
  }

  async existsWithEmail(email: string) {
    return await this.prisma.usuario.findMany({
      where: {
        email
      }
    });
  }

  async findById(id: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id }
    });

    if(!usuario) {
      throw new Error('Usuário não encontrado');
    }

    return usuario;
  }

  async update(id: string, updateData: Partial<UsuarioEntity>): Promise<UsuarioEntity> {
    await this.findById(id);

    return this.prisma.usuario.update({
      where: { id },
      data: updateData
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
