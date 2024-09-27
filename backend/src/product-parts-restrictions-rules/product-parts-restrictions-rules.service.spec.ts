import { Test, TestingModule } from '@nestjs/testing';
import { ProductPartsRestrictionsRulesService } from './product-parts-restrictions-rules.service';

describe('ProductPartsRestrictionsRulesService', () => {
  let service: ProductPartsRestrictionsRulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductPartsRestrictionsRulesService],
    }).compile();

    service = module.get<ProductPartsRestrictionsRulesService>(ProductPartsRestrictionsRulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
