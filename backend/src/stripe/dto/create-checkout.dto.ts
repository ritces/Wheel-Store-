import { IsNotEmpty, IsArray } from 'class-validator';
export class CreateCheckoutDto {
  @IsArray()
  @IsNotEmpty()
  data: [
    {
      name: string;
      totalPrice: number;
      image: string;
    },
  ];
}