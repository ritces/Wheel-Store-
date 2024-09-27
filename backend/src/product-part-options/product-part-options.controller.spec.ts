import { Test, TestingModule } from '@nestjs/testing';
import { ProductPartOptionsController } from './product-part-options.controller';
import { ProductPartOptionsService } from './product-part-options.service';

describe('ProductPartOptionsController', () => {
  let controller: ProductPartOptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductPartOptionsController],
      providers: [ProductPartOptionsService],
    }).compile();

    controller = module.get<ProductPartOptionsController>(ProductPartOptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
