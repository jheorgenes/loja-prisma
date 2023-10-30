import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async create(@Body() createProdutoDto: CreateProdutoDto) {
    const produto = await this.produtoService.create(createProdutoDto);

    return {
      mensagem: 'Produto salvo com sucesso',
      produto
    }
  }

  @Get()
  async findAll() {
    return this.produtoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.produtoService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(id, updateProdutoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.produtoService.remove(id);
  }
}
