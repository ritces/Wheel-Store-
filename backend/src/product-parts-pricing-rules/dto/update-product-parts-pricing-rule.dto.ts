import { PartialType } from '@nestjs/swagger';
import { CreateProductPartsPricingRuleDto } from './create-product-parts-pricing-rule.dto';

export class UpdateProductPartsPricingRuleDto extends PartialType(CreateProductPartsPricingRuleDto) {}
