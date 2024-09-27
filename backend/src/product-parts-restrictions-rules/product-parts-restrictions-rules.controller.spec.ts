import { Test, TestingModule } from '@nestjs/testing';
import { ProductPartsRestrictionsRulesController } from './product-parts-restrictions-rules.controller';
import { ProductPartsRestrictionsRulesService } from './product-parts-restrictions-rules.service';

describe('ProductPartsRestrictionsRulesController', () => {
  let controller: ProductPartsRestrictionsRulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductPartsRestrictionsRulesController],
      providers: [ProductPartsRestrictionsRulesService],
    }).compile();

    controller = module.get<ProductPartsRestrictionsRulesController>(ProductPartsRestrictionsRulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
