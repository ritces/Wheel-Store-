import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  stock_quantity: number;

  @IsString()
  @IsOptional()
  type: string;
}
