import { Test, TestingModule } from '@nestjs/testing';
import { ProductPartsPricingRulesController } from './product-parts-pricing-rules.controller';
import { ProductPartsPricingRulesService } from './product-parts-pricing-rules.service';

describe('ProductPartsPricingRulesController', () => {
  let controller: ProductPartsPricingRulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductPartsPricingRulesController],
      providers: [ProductPartsPricingRulesService],
    }).compile();

    controller = module.get<ProductPartsPricingRulesController>(ProductPartsPricingRulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
