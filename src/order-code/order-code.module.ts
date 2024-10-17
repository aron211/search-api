import { Module } from '@nestjs/common';
import { OrderCodeService } from './order-code.service';
import { OrderCodeController } from './order-code.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderCode } from './entities/order-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderCode])],
  controllers: [OrderCodeController],
  providers: [OrderCodeService],
  exports: [OrderCodeService],
})
export class OrderCodeModule {}
