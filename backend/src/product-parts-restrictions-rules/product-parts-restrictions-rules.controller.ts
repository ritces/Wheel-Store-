import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductPartsRestrictionsRulesService } from './product-parts-restrictions-rules.service';
import { CreateProductPartsRestrictionsRuleDto } from './dto/create-product-parts-restrictions-rule.dto';
import { UpdateProductPartsRestrictionsRuleDto } from './dto/update-product-parts-restrictions-rule.dto';

@Controller('restriction-rules')
export class ProductPartsRestrictionsRulesController {
  constructor(
    private readonly productPartsRestrictionsRulesService: ProductPartsRestrictionsRulesService,
  ) {}

  @Get('/conditions')
  getAllRestrictionConditions() {
    return this.productPartsRestrictionsRulesService.getAllRestrictionConditions();
  }

  @Post()
  create(
    @Body()
    createProductPartsRestrictionsRuleDto: CreateProductPartsRestrictionsRuleDto,
  ) {
    return this.productPartsRestrictionsRulesService.create(
      createProductPartsRestrictionsRuleDto,
    );
  }

  @Get()
  findAll() {
    return this.productPartsRestrictionsRulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productPartsRestrictionsRulesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateProductPartsRestrictionsRuleDto: UpdateProductPartsRestrictionsRuleDto,
  ) {
    return this.productPartsRestrictionsRulesService.update(
      +id,
      updateProductPartsRestrictionsRuleDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productPartsRestrictionsRulesService.remove(+id);
  }
}
