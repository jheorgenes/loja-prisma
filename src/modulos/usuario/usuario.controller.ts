import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { HashearSenhaPipe } from 'src/recursos/pipes/hashear-senha.pipe';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { ListUsuarioDto } from './dto/list-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async create(
    @Body() { senha, ...createUsuarioDto }: CreateUsuarioDto,
    @Body('senha', HashearSenhaPipe) senhaHasheada: string,
  ) {

    const usuario = await this.usuarioService.create({
      ...createUsuarioDto,
      senha: senhaHasheada
    });

    return {
      usuario: new ListUsuarioDto(usuario.id, usuario.nome),
      mensagem: 'Usuário criado com sucesso'
    }
  }

  @Get()
  async findAll() {
    return this.usuarioService.findAll();
  }

  @Get('email/:email')
  async findOneByEmail(@Param('email') email: string) {
    return this.usuarioService.findUsuarioByEmail(email);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usuarioService.findUsuarioById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    const usuarioAtualizado = await this.usuarioService.update(id, updateUsuarioDto);

    return {
      usuarioAtualizado,
      mensagem: 'Usuário atualizado com sucesso'
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const usuarioRemovido = await this.usuarioService.remove(id);

    return {
      usuarioRemovido,
      mensagem: 'Usuário removido com sucesso'
    }
  }
}
