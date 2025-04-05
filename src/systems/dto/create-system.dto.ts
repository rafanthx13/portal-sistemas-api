import { IsString, IsNotEmpty, IsOptional, IsArray, IsDate, MaxLength, IsUrl, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateSystemDto {
  @ApiProperty({
    description: 'Nome do sistema',
    example: 'Sistema de RH',
    maxLength: 45,
  })
  @IsString()
  @IsNotEmpty({ message: 'O nome do sistema é obrigatório' })
  @MaxLength(45, { message: 'O nome deve ter no máximo 45 caracteres' })
  name: string;

  @ApiProperty({
    description: 'URL do sistema',
    example: 'https://rh.empresa.com.br',
    maxLength: 180,
  })
  @IsString()
  @IsNotEmpty({ message: 'A URL do sistema é obrigatória' })
  @IsUrl({}, { message: 'A URL deve ser válida' })
  @MaxLength(180, { message: 'A URL deve ter no máximo 180 caracteres' })
  url: string;

  @ApiPropertyOptional({
    description: 'Ícone do sistema',
    example: 'fa-users',
    maxLength: 50,
  })
  @IsString()
  @IsOptional()
  @MaxLength(50, { message: 'O ícone deve ter no máximo 50 caracteres' })
  icon?: string;

  @ApiPropertyOptional({
    description: 'Categoria do sistema',
    example: 'RH',
    maxLength: 60,
  })
  @IsString()
  @IsOptional()
  @MaxLength(60, { message: 'A categoria deve ter no máximo 60 caracteres' })
  category?: string;

  @ApiPropertyOptional({
    description: 'Tags do sistema',
    example: ['recursos humanos', 'folha de pagamento'],
    type: [String],
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({
    description: 'Responsável pelo sistema',
    example: 'João Silva',
    maxLength: 60,
  })
  @IsString()
  @IsOptional()
  @MaxLength(60, { message: 'O responsável deve ter no máximo 60 caracteres' })
  responsible?: string;

  @ApiPropertyOptional({
    description: 'Descrição do sistema',
    example: 'Sistema para gestão de recursos humanos',
    maxLength: 120,
  })
  @IsString()
  @IsOptional()
  @MaxLength(120, { message: 'A descrição deve ter no máximo 120 caracteres' })
  description?: string;

  @ApiPropertyOptional({
    description: 'Stack tecnológica do sistema',
    example: 'React, Node.js, PostgreSQL',
    maxLength: 90,
  })
  @IsString()
  @IsOptional()
  @MaxLength(90, { message: 'A stack tecnológica deve ter no máximo 90 caracteres' })
  techStack?: string;

  @ApiPropertyOptional({
    description: 'Data de expiração do sistema',
    example: '2025-12-31T23:59:59Z',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  expirationDate?: Date;

  @ApiPropertyOptional({
    description: 'Dependências do sistema',
    example: 'Sistema de Autenticação, Sistema de Notificações',
    maxLength: 180,
  })
  @IsString()
  @IsOptional()
  @MaxLength(180, { message: 'As dependências devem ter no máximo 180 caracteres' })
  dependencies?: string;

  @ApiPropertyOptional({
    description: 'Status do sistema',
    example: 'Ativo',
    enum: ['Ativo', 'Inativo'],
    default: 'Ativo',
  })
  @IsString()
  @IsOptional()
  @IsIn(['Ativo', 'Inativo'], { message: 'O status deve ser "Ativo" ou "Inativo"' })
  status?: string;

  @ApiPropertyOptional({
    description: 'Nível de acesso do sistema',
    example: 'Público',
    enum: ['Público', 'Restrito', 'Específico por Departamento'],
    default: 'Público',
  })
  @IsString()
  @IsOptional()
  @IsIn(['Público', 'Restrito', 'Específico por Departamento'], {
    message: 'O nível de acesso deve ser "Público", "Restrito" ou "Específico por Departamento"'
  })
  accessLevel?: string;
}
