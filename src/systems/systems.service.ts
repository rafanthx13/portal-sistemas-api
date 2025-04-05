import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { System } from './entities/system.entity';
import { CreateSystemDto } from './dto/create-system.dto';

@Injectable()
export class SystemsService {
  constructor(
    @InjectRepository(System)
    private systemsRepository: Repository<System>,
  ) {}

  async create(createSystemDto: CreateSystemDto): Promise<System> {
    const system = this.systemsRepository.create(createSystemDto);
    return await this.systemsRepository.save(system);
  }

  async findAll(): Promise<System[]> {
    return await this.systemsRepository.find();
  }

  async findOne(id: number): Promise<System> {
    const system = await this.systemsRepository.findOne({ where: { id } });
    if (!system) {
      throw new NotFoundException(`Sistema com ID ${id} não encontrado`);
    }
    return system;
  }

  async update(id: number, updateSystemDto: Partial<CreateSystemDto>): Promise<System> {
    const system = await this.findOne(id);
    Object.assign(system, updateSystemDto);
    return await this.systemsRepository.save(system);
  }

  async updateStatus(id: number, status: string): Promise<System> {
    const system = await this.findOne(id);
    system.status = status;
    return await this.systemsRepository.save(system);
  }

  async remove(id: number): Promise<void> {
    const result = await this.systemsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Sistema com ID ${id} não encontrado`);
    }
  }

  async findByCategory(category: string): Promise<System[]> {
    return await this.systemsRepository.find({ where: { category } });
  }

  async findByStatus(status: string): Promise<System[]> {
    return await this.systemsRepository.find({ where: { status } });
  }

  async findByAccessLevel(accessLevel: string): Promise<System[]> {
    return await this.systemsRepository.find({ where: { accessLevel } });
  }
}
