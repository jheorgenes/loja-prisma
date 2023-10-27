import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { ListUsuarioDto } from './dto/list-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioEntity } from './entities/usuario.entity';
import { UsuarioRepository } from './usuario.repository';

@Injectable()
export class UsuarioService {

  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async create(usuario: CreateUsuarioDto) {
    const usuarioEntity = new UsuarioEntity();

    Object.assign(usuarioEntity, usuario as UsuarioEntity);

    return await this.usuarioRepository.create(usuarioEntity);
  }

  async findAll() {
    const usuariosSalvos = await this.usuarioRepository.findAll();
    const usuariosLista = usuariosSalvos.map((usuario) => new ListUsuarioDto(usuario.id, usuario.nome));
    return usuariosLista;
  }

  async findUsuarioById(id: string) {
    return await this.usuarioRepository.findById(id);
  }

  async findUsuarioByEmail(email: string) {

    const result = await this.usuarioRepository.existsWithEmail(email);

    if(!result || result === undefined || result.length === 0) {
      throw new NotFoundException('Não existe usuário com esse email');
    }

    return result;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.findById(id);

    if(usuario === null) {
      throw new NotFoundException(`Não existe um usuário com o id ${id}`);
    }

    Object.assign(usuario, updateUsuarioDto as UsuarioEntity);

    return this.usuarioRepository.update(id, usuario);
  }

  async remove(id: string) {
    return await this.usuarioRepository.delete(id);
  }
}
