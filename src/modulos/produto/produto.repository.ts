import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CaracteristicaProdutoDto, CreateProdutoDto } from "./dto/create-produto.dto";
import { ProdutoEntity } from "./entities/produto.entity";

@Injectable()
export class ProdutoRepository {

  constructor(private readonly prisma: PrismaService) {}

  async create(produto: CreateProdutoDto): Promise<ProdutoEntity> {
    return this.prisma.produto.create({
      data: {
        nome: produto.nome,
        valor: produto.valor,
        quantidadeDisponivel: produto.quantidadeDisponivel,
        descricao: produto.descricao,
        categoria: produto.categoria,
        caracteristicas: {
          connectOrCreate: caracteristicas.map((caracteristica) => {
            return {
              create: { data: produto.caracteristicas }
             }
          })
        }
      }
    });
  }

  async findAll(): Promise<ProdutoEntity[]> {
    return this.prisma.produto.findMany();
  }

  async findById(id: string): Promise<ProdutoEntity> {
    const produto = await this.prisma.produto.findUnique({
      where: { id }
    });

    if(!produto) {
      throw new Error('Não existe produto com esse id no banco de dados');
    }

    return produto;
  }

  async update(id: string, updateData: Partial<ProdutoEntity>): Promise<ProdutoEntity> {
    await this.findById(id);

    return this.prisma.produto.update({
      where: { id },
      data: updateData
    });
  }

  async remove(id: string) {
    await this.findById(id);

    return await this.prisma.usuario.delete({
      where: { id }
    });
  }
}
