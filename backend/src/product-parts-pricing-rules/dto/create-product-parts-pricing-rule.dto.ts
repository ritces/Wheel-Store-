import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductPartsPricingRuleDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  additional_price: number;
}
