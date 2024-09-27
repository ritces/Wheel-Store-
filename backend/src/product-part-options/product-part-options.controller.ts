import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductPartOptionsService } from './product-part-options.service';
import { CreateProductPartOptionDto } from './dto/create-product-part-option.dto';
import { UpdateProductPartOptionDto } from './dto/update-product-part-option.dto';

@Controller('product-parts/options')
export class ProductPartOptionsController {
  constructor(
    private readonly productPartOptionsService: ProductPartOptionsService,
  ) {}

  @Post()
  create(@Body() createProductPartOptionDto: CreateProductPartOptionDto) {
    return this.productPartOptionsService.create(createProductPartOptionDto);
  }

  @Get()
  findAll() {
    return this.productPartOptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productPartOptionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductPartOptionDto: UpdateProductPartOptionDto,
  ) {
    return this.productPartOptionsService.update(
      +id,
      updateProductPartOptionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productPartOptionsService.remove(+id);
  }

  @Post(':id/pricing-rules/:pricingRuleId')
  assignPricingRuleToPartOption(
    @Param('id') id: string,
    @Param('pricingRuleId') pricingRuleId: string,
  ) {
    return this.productPartOptionsService.assignPricingRuleToPartOption(
      +id,
      +pricingRuleId,
    );
  }

  @Get(':id/pricing-rules')
  getPricingRulesByPartOptionId(@Param('id') id: string) {
    return this.productPartOptionsService.getPricingRulesByPartOptionId(+id);
  }

  @Delete(':id/pricing-rules/:pricingRuleId')
  unassignPricingRuleFromPartOption(
    @Param('id') id: string,
    @Param('pricingRuleId') pricingRuleId: string,
  ) {
    return this.productPartOptionsService.unassignPricingRuleFromPartOption(
      +id,
      +pricingRuleId,
    );
  }

  @Post(':id/restriction-rules/:restrictionRuleId')
  assignRestrictionRuleToPartOption(
    @Param('id') id: string,
    @Param('restrictionRuleId') restrictionRuleId: string,
  ) {
    return this.productPartOptionsService.assignRestrictionRuleToPartOption(
      +id,
      +restrictionRuleId,
    );
  }

  @Delete(':id/restriction-rules/:restrictionRuleId')
  unassignRestrictionRuleFromPartOption(
    @Param('id') id: string,
    @Param('restrictionRuleId') restrictionRuleId: string,
  ) {
    return this.productPartOptionsService.unassignRestrictionRuleFromPartOption(
      +id,
      +restrictionRuleId,
    );
  }

  @Get(':id/restriction-rules')
  getRestrictionRulesByPartOptionId(@Param('id') id: string) {
    return this.productPartOptionsService.getRestrictionRulesByPartOptionId(
      +id,
    );
  }
}
