import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { CustomLogger } from 'src/recursos/interceptors/custom-logger/custom-logger.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoService } from './produto.service';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ProdutoEntity } from './entities/produto.entity';

@Controller('produtos')
export class ProdutoController {
  constructor(
    private readonly produtoService: ProdutoService,
    private readonly logger: CustomLogger,
    @Inject(CACHE_MANAGER) private gerenciadorCache: Cache
  ) {}

  @Post()
  async create(@Body() createProdutoDto: CreateProdutoDto) {
    const produto = await this.produtoService.create(createProdutoDto);

    this.logger.logEmArquivo(produto)
    this.logger.logColorido(produto)

    return {
      mensagem: 'Produto salvo com sucesso',
      produto
    }
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async findAll() {
    return this.produtoService.findAll();
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async findOne(@Param('id') id: string) {

    let produto = await this.gerenciadorCache.get<ProdutoEntity>(`produto-${id}`);

    if(!produto) {
      console.log('Obtendo produto e armazenando no cache!');
      produto = await this.produtoService.findOne(id);

      await this.gerenciadorCache.set(`produto-${id}`, produto);
    }

    return {
      mensagem: 'Produto obtido com sucesso',
      produto
    }
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
