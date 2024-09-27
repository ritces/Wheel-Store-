import { PartialType } from '@nestjs/swagger';
import { CreateProductPartOptionDto } from './create-product-part-option.dto';

export class UpdateProductPartOptionDto extends PartialType(CreateProductPartOptionDto) {}
