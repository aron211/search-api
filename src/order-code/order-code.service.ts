import { Injectable } from '@nestjs/common';
import { CreateOrderCodeDto } from './dto/create-order-code.dto';
import { UpdateOrderCodeDto } from './dto/update-order-code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderCode } from './entities/order-code.entity';

@Injectable()
export class OrderCodeService {
  constructor(
    @InjectRepository(OrderCode)
    private readonly orderCodeRepository: Repository<OrderCode>,
    
  ) {}  
  async getNextCode(): Promise<string> {
    const lastOrderCode = await this.orderCodeRepository.find({
      order: { code: 'DESC' },
      take: 1,
    });
    const lastCode = lastOrderCode.length > 0 ? lastOrderCode[0].code : '00000000';
    const nextCode = (parseInt(lastCode, 10) + 1).toString().padStart(8, '0');
    await this.saveCode(nextCode);
    return nextCode;
  }

  async saveCode(code: string): Promise<void> {
    await this.orderCodeRepository.save({ code });
  }
  create(createOrderCodeDto: CreateOrderCodeDto) {
    return 'This action adds a new orderCode';
  }

  findAll() {
    return `This action returns all orderCode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderCode`;
  }

  update(id: number, updateOrderCodeDto: UpdateOrderCodeDto) {
    return `This action updates a #${id} orderCode`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderCode`;
  }
}
