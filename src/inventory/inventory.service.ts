import { Injectable,
  BadRequestException,
  UnauthorizedException,
 } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly InventoryRepository: Repository<Inventory>,
    private readonly configService: ConfigService,
  ) { }

  create(createInventoryDto: CreateInventoryDto) {
    return this.InventoryRepository.save(createInventoryDto);
  }

  async findAll() {
    return await this.InventoryRepository.find();
  }

  findOne(id: string) {
    return this.InventoryRepository.findOneBy({ id });
  }

    // Método para encontrar inventarios por múltiples IDs
    async findByIds(ids: string[]): Promise<Inventory[]> {
      return this.InventoryRepository.findBy({ id: In(ids) });
    }
  findOneById(id: string) {
    return this.InventoryRepository.findOne({ 
      where: { id },
      select: [
        'id',
        'codigo',
        'name',
        'marca',
        'cant',
        'priceD',
        'cost',
        'sucursal',
      ],
     });
  }

  async update(id: string, updateInventoryDto: UpdateInventoryDto) {
    const inventory = await this.findOne(id);
    if (!inventory) {
      throw new UnauthorizedException('id is wrong');
    }
    return await this.InventoryRepository.update(id, { ...updateInventoryDto });
  }


  async remove(id: string) {
    await this.findOne(id);
    return this.InventoryRepository.softRemove({ id });
  }
}
