import { Controller, Get, Post, Body, Patch, Param, Delete, Query  } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Inventory } from './entities/inventory.entity';
@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  // @ApiBearerAuth()
  @Get()
  // @Auth(Role.ADMIN,Role.USER,Role.TECNICHAL)
  findAll() {
    return this.inventoryService.findAll();
  }
  @Get('search')
  async searchInventory(@Query('keywords') keywords: string): Promise<Inventory[]> {
      console.log('Keywords:', keywords);
      const keywordArray = keywords.split(' '); // Divide las palabras clave
      return await this.inventoryService.searchInventory(keywordArray);
  }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto) {
    return this.inventoryService.update(id, updateInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(id);
  }
}
