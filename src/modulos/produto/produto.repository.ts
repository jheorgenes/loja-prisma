import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ProdutoCaracteristicaEntity } from "./entities/produto-caracteristica.entity";
import { ProdutoImagemEntity } from "./entities/produto-imagem.entity";
import { ProdutoEntity } from "./entities/produto.entity";
import { UpdateProdutoDto } from "./dto/update-produto.dto";

@Injectable()
export class ProdutoRepository {

  constructor(private readonly prisma: PrismaService) {}

  async create(
    produto: ProdutoEntity,
    caracteristicas: ProdutoCaracteristicaEntity[],
    imagens: ProdutoImagemEntity[]
  ): Promise<ProdutoEntity> {
    return this.prisma.produto.create({
      data: {
        ...produto,
        caracteristicas: {
          create: caracteristicas
        },
        imagens: {
          create: imagens
        }
      },
      include: {
        caracteristicas: true,
        imagens: true
      }
    });
  }

  async findAll() {
    return this.prisma.produto.findMany({
      include: {
        caracteristicas: true,
        imagens: true
      }
    });
  }

  async findById(id: string) {
    const produto = await this.prisma.produto.findUnique({
      where: { id },
      include: {
        caracteristicas: true,
        imagens: true
      }
    });

    if(!produto) {
      throw new Error('Não existe produto com esse id no banco de dados');
    }

    return produto;
  }

  async update(
    id: string,
    updateData: UpdateProdutoDto,
    caracteristicasDto?: ProdutoCaracteristicaEntity[],
    imagensDto?: ProdutoImagemEntity[]
  ): Promise<ProdutoEntity> {
    const produtoBd = await this.findById(id);
    const { caracteristicas, imagens } = produtoBd;

    if(caracteristicasDto !== null && caracteristicasDto !== undefined) {
      caracteristicas.forEach(
        async caracteristica => {
          await this.prisma.produtoCaracteristicas.delete({
            where: {
              id: caracteristica.id
            }
          })
        }
      )
    }

    if(imagensDto !== null && imagensDto !== undefined) {
      imagens.forEach(async imagem => {
        await this.prisma.produtoImagens.delete({
          where: {
            id: imagem.id
          }
        })
      })
    }


    return await this.prisma.produto.update({
      where: { id },
      data: {
        ...updateData,
        caracteristicas: {
          create: caracteristicasDto
        },
        imagens: {
          create: imagensDto
        }
      },
      include: {
        caracteristicas: true,
        imagens: true
      }
    });
    // return await this.prisma.produto.update({
    //   where: { id: id },
    //   data: {
    //     ...updateData,
    //     caracteristicas: {
    //       // Atualiza ou cria novas caracteristicas
    //       upsert: caracteristicasDto.map((caracteristica) => ({
    //         where: { id: caracteristica.id },
    //         update: caracteristica,
    //         create: caracteristica
    //       }))
    //     },
    //     imagens: {
    //       upsert: imagensDto.map((imagem) => ({
    //         where: { id: imagem.id },
    //         update: imagem,
    //         create: imagem
    //       }))
    //     }
    //   }
    // });
  }

  async remove(id: string) {
    const produto = await this.findById(id);

    //Excluindo caracteristicas relacionadas
    await this.prisma.produtoCaracteristicas.deleteMany({
      where: { produtoId: produto.id }
    })

    //Excluindo imagens relacionadas
    await this.prisma.produtoImagens.deleteMany({
      where: { produtoId: produto.id }
    })

    return this.prisma.produto.delete({
      where: { id },
    });
  }
}
