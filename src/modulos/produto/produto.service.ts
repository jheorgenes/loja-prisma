import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { ListProdutoDto } from './dto/list-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoCaracteristicaEntity } from './entities/produto-caracteristica.entity';
import { ProdutoImagemEntity } from './entities/produto-imagem.entity';
import { ProdutoEntity } from './entities/produto.entity';
import { ProdutoRepository } from './produto.repository';

@Injectable()
export class ProdutoService {

  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async create(produto: CreateProdutoDto) {

    const caracteristicasDto = produto.caracteristicas;
    const imagensDto = produto.imagens;

    delete produto.caracteristicas;
    delete produto.imagens;

    const produtoEntity = new ProdutoEntity();
    Object.assign(produtoEntity, produto);

    const caracteristicas = [];
    caracteristicasDto.forEach(caracteristica => {
      let caracteristicaEntity = new ProdutoCaracteristicaEntity();
      Object.assign(caracteristicaEntity, caracteristica);
      caracteristicas.push(caracteristicaEntity);
    });

    const imagens = [];
    imagensDto.forEach(imagem => {
      let imagemEntity = new ProdutoImagemEntity();
      Object.assign(imagemEntity, imagem);
      imagens.push(imagemEntity);
    })

    return await this.produtoRepository.create(produtoEntity, caracteristicas, imagens);
  }

  async findAll() {
    const produtos = await this.produtoRepository.findAll();

    const listProdutosDto = [];
    for(let produto of produtos) {
      const { caracteristicas, imagens } = produto;

      const produtoDto = new ListProdutoDto(
        produto.id,
        produto.nome,
        Number(produto.quantidadeDisponivel),
        caracteristicas,
        imagens
      )
      listProdutosDto.push(produtoDto);
    }

    return listProdutosDto;
  }

  async findOne(id: string) {
    return this.produtoRepository.findById(id);
  }

  async update(id: string, updateProduto: UpdateProdutoDto) {

    const caracteristicasDto = updateProduto.caracteristicas;
    const imagensDto = updateProduto.imagens;

    delete updateProduto.caracteristicas;
    delete updateProduto.imagens;

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

    return this.produtoRepository.update(id, updateProduto, caracteristicas, imagens);
  }

  async remove(id: string) {
    return this.produtoRepository.remove(id);
  }
}
