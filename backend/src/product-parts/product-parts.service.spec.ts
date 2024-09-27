import { Test, TestingModule } from '@nestjs/testing';
import { ProductPartsService } from './product-parts.service';

describe('ProductPartsService', () => {
  let service: ProductPartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductPartsService],
    }).compile();

    service = module.get<ProductPartsService>(ProductPartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
