import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateProdutoDto } from "./dto/update-produto.dto";
import { ProdutoCaracteristicaEntity } from "./entities/produto-caracteristica.entity";
import { ProdutoImagemEntity } from "./entities/produto-imagem.entity";
import { ProdutoEntity } from "./entities/produto.entity";

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
        },
        itensPedido: {
          connect: []
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

  async findManyByIds(ids: string[]) {
    const produto = await this.prisma.produto.findMany({
      where: {
        id: {
          in: ids
        }
      },
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
        updatedAt: new Date(),
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
  }

  async atualizaQuantidadeProduto(id: string, quantidade: number) {
    const produto = await this.findById(id);

    const novoItem = new UpdateProdutoDto();
    novoItem.nome = produto.nome;
    novoItem.valor = produto.valor;
    novoItem.categoria = produto.categoria;
    novoItem.descricao = produto.descricao;

    if(produto.quantidadeDisponivel < quantidade) {
      throw new BadRequestException('Não há estoque suficiente para a compra');
    }

    novoItem.quantidadeDisponivel = produto.quantidadeDisponivel - quantidade;

    const caracteristicasDto = produto.caracteristicas;
    const imagensDto = produto.imagens;

    delete novoItem.caracteristicas;
    delete novoItem.imagens;


    const caracteristicas = [];
    if(caracteristicasDto) {
      caracteristicasDto.forEach(caracteristica => {
        let caracteristicaEntity = new ProdutoCaracteristicaEntity();
        Object.assign(caracteristicaEntity, caracteristica);
        caracteristicas.push(caracteristicaEntity);
      });
    }

    const imagens = [];
    if(imagensDto) {
      imagensDto.forEach(imagem => {
        let imagemEntity = new ProdutoImagemEntity();
        Object.assign(imagemEntity, imagem);
        imagens.push(imagemEntity);
      })
    }

    await this.prisma.produto.update({
      where: { id },
      data: {
        ...novoItem,
        caracteristicas: {
          connect: caracteristicasDto
        },
        imagens: {
          connect: imagensDto
        }
      }
    });
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
      where: { id }
    });
  }
}
