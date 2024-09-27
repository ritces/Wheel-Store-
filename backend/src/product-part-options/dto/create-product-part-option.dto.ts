import { IsNumber, IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateProductPartOptionDto {
  @IsNumber()
  @IsNotEmpty()
  part_id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  is_available: boolean;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
