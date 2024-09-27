import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRestrictionConditionDto {
  @IsNumber()
  @IsNotEmpty()
  part_option_id: number;

  @IsNumber()
  @IsNotEmpty()
  rule_id: number;
}
