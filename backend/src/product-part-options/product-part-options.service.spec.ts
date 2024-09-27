import { Test, TestingModule } from '@nestjs/testing';
import { ProductPartOptionsService } from './product-part-options.service';

describe('ProductPartOptionsService', () => {
  let service: ProductPartOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductPartOptionsService],
    }).compile();

    service = module.get<ProductPartOptionsService>(ProductPartOptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
