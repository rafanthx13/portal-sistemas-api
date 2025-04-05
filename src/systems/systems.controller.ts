import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SystemsService } from './systems.service';
import { CreateSystemDto } from './dto/create-system.dto';
import { System } from './entities/system.entity';

@ApiTags('systems')
@Controller('systems')
export class SystemsController {
  constructor(private readonly systemsService: SystemsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo sistema' })
  @ApiResponse({ status: 201, description: 'Sistema criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createSystemDto: CreateSystemDto) {
    return this.systemsService.create(createSystemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os sistemas' })
  @ApiResponse({ status: 200, description: 'Lista de sistemas retornada com sucesso' })
  findAll() {
    return this.systemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um sistema pelo ID' })
  @ApiResponse({ status: 200, description: 'Sistema encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Sistema não encontrado' })
  findOne(@Param('id') id: string) {
    return this.systemsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um sistema' })
  @ApiResponse({ status: 200, description: 'Sistema atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Sistema não encontrado' })
  update(@Param('id') id: string, @Body() updateSystemDto: Partial<CreateSystemDto>) {
    return this.systemsService.update(+id, updateSystemDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Atualizar o status de um sistema' })
  @ApiResponse({ status: 200, description: 'Status do sistema atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Sistema não encontrado' })
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.systemsService.updateStatus(+id, status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um sistema' })
  @ApiResponse({ status: 200, description: 'Sistema removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Sistema não encontrado' })
  remove(@Param('id') id: string) {
    return this.systemsService.remove(+id);
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Buscar sistemas por categoria' })
  @ApiResponse({ status: 200, description: 'Lista de sistemas por categoria retornada com sucesso' })
  findByCategory(@Param('category') category: string) {
    return this.systemsService.findByCategory(category);
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Buscar sistemas por status' })
  @ApiResponse({ status: 200, description: 'Lista de sistemas por status retornada com sucesso' })
  findByStatus(@Param('status') status: string) {
    return this.systemsService.findByStatus(status);
  }

  @Get('access-level/:accessLevel')
  @ApiOperation({ summary: 'Buscar sistemas por nível de acesso' })
  @ApiResponse({ status: 200, description: 'Lista de sistemas por nível de acesso retornada com sucesso' })
  findByAccessLevel(@Param('accessLevel') accessLevel: string) {
    return this.systemsService.findByAccessLevel(accessLevel);
  }
}
