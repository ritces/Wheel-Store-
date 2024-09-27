import { Test, TestingModule } from '@nestjs/testing';
import { ProductPartsPricingRulesService } from './product-parts-pricing-rules.service';

describe('ProductPartsPricingRulesService', () => {
  let service: ProductPartsPricingRulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductPartsPricingRulesService],
    }).compile();

    service = module.get<ProductPartsPricingRulesService>(ProductPartsPricingRulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
