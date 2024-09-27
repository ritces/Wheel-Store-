import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductPartsPricingRulesService } from './product-parts-pricing-rules.service';
import { CreateProductPartsPricingRuleDto } from './dto/create-product-parts-pricing-rule.dto';
import { UpdateProductPartsPricingRuleDto } from './dto/update-product-parts-pricing-rule.dto';

@Controller('pricing-rules')
export class ProductPartsPricingRulesController {
  constructor(
    private readonly productPartsPricingRulesService: ProductPartsPricingRulesService,
  ) {}

  @Get('/conditions')
  getAllPricingConditions() {
    return this.productPartsPricingRulesService.getAllPricingConditions();
  }

  @Post()
  create(
    @Body() createProductPartsPricingRuleDto: CreateProductPartsPricingRuleDto,
  ) {
    return this.productPartsPricingRulesService.create(
      createProductPartsPricingRuleDto,
    );
  }

  @Get('/conditions')
  @Get()
  findAll() {
    return this.productPartsPricingRulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productPartsPricingRulesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductPartsPricingRuleDto: UpdateProductPartsPricingRuleDto,
  ) {
    return this.productPartsPricingRulesService.update(
      +id,
      updateProductPartsPricingRuleDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productPartsPricingRulesService.remove(+id);
  }
}
