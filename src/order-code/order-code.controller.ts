import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderCodeService } from './order-code.service';
import { CreateOrderCodeDto } from './dto/create-order-code.dto';
import { UpdateOrderCodeDto } from './dto/update-order-code.dto';

@Controller('order-code')
export class OrderCodeController {
  constructor(private readonly orderCodeService: OrderCodeService) {}

  @Post()
  create(@Body() createOrderCodeDto: CreateOrderCodeDto) {
    return this.orderCodeService.create(createOrderCodeDto);
  }

  @Get()
  findAll() {
    return this.orderCodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderCodeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderCodeDto: UpdateOrderCodeDto) {
    return this.orderCodeService.update(+id, updateOrderCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderCodeService.remove(+id);
  }
}
