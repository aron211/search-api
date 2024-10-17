import { PartialType } from '@nestjs/swagger';
import { CreateOrderCodeDto } from './create-order-code.dto';

export class UpdateOrderCodeDto extends PartialType(CreateOrderCodeDto) {}
