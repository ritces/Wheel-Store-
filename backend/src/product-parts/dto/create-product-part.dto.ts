import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductPartDto {
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
