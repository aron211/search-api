import { Test, TestingModule } from '@nestjs/testing';
import { OrderCodeService } from './order-code.service';

describe('OrderCodeService', () => {
  let service: OrderCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderCodeService],
    }).compile();

    service = module.get<OrderCodeService>(OrderCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
