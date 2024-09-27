import { PartialType } from '@nestjs/swagger';
import { CreateProductPartsRestrictionsRuleDto } from './create-product-parts-restrictions-rule.dto';

export class UpdateProductPartsRestrictionsRuleDto extends PartialType(CreateProductPartsRestrictionsRuleDto) {}
