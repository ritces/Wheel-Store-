import { PartialType } from '@nestjs/swagger';
import { CreateProductPartDto } from './create-product-part.dto';

export class UpdateProductPartDto extends PartialType(CreateProductPartDto) {}
