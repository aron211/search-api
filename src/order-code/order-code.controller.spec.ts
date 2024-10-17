import { Test, TestingModule } from '@nestjs/testing';
import { OrderCodeController } from './order-code.controller';
import { OrderCodeService } from './order-code.service';

describe('OrderCodeController', () => {
  let controller: OrderCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderCodeController],
      providers: [OrderCodeService],
    }).compile();

    controller = module.get<OrderCodeController>(OrderCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
