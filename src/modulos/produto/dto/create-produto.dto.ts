import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, IsUrl, MaxLength, Min, ValidateNested } from "class-validator";
import { ProdutoEntity } from "../entities/produto.entity";
import { Type } from "class-transformer";

export class CaracteristicaProdutoDto {

  id: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome da característica não pode ser maior' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição da característica não pode ser vazia' })
  descricao: string;

  produto: ProdutoEntity;
}

export class ImagemProdutoDto {

  id: string;

  @IsUrl()
  @MaxLength(100, { message: 'Usuário não pode ter mais que 100 caracteres' })
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
  descricao: string;

  produto: ProdutoEntity;
}

export class CreateProdutoDto {

  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome do produto não pode ser vazio'})
  nome: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(1, { message: 'O valor precisa ser maior que zero' })
  valor: number;

  @IsNumber()
  @Min(0, { message: 'Quantidade Disponível mínima inválida' })
  quantidadeDisponivel: number;

  @IsString({ message: 'Descrição deve ser uma string' })
  @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia' })
  @MaxLength(1000, { message: 'Descrição não pode ter mais que 1000 caracteres' })
  descricao: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CaracteristicaProdutoDto)
  caracteristicas: CaracteristicaProdutoDto[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ImagemProdutoDto)
  imagens: ImagemProdutoDto[];

  @IsString({ message: 'Categoria deve ser uma string' })
  @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
  categoria: string;
}
