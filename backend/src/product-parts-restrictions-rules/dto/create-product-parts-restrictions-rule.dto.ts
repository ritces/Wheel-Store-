import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductPartsRestrictionsRuleDto {
  @IsString()
  @IsNotEmpty()
  description: string;
}
