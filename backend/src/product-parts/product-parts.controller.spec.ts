import { Test, TestingModule } from '@nestjs/testing';
import { ProductPartsController } from './product-parts.controller';
import { ProductPartsService } from './product-parts.service';

describe('ProductPartsController', () => {
  let controller: ProductPartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductPartsController],
      providers: [ProductPartsService],
    }).compile();

    controller = module.get<ProductPartsController>(ProductPartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
