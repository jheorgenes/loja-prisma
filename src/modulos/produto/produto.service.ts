import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoRepository } from './produto.repository';
import { ProdutoEntity } from './entities/produto.entity';

@Injectable()
export class ProdutoService {

  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async create(produto: CreateProdutoDto) {

    // await this.produtoRepository.create(produto);
  }

  findAll() {
    return `This action returns all produto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} produto`;
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return `This action updates a #${id} produto`;
  }

  remove(id: number) {
    return `This action removes a #${id} produto`;
  }
}
