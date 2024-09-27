import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductPartsService } from './product-parts.service';
import { CreateProductPartDto } from './dto/create-product-part.dto';
import { UpdateProductPartDto } from './dto/update-product-part.dto';

@Controller('product-parts')
export class ProductPartsController {
  constructor(private readonly productPartsService: ProductPartsService) {}

  @Post()
  create(@Body() createProductPartDto: CreateProductPartDto) {
    return this.productPartsService.create(createProductPartDto);
  }

  @Get()
  findAll() {
    return this.productPartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productPartsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductPartDto: UpdateProductPartDto,
  ) {
    return this.productPartsService.update(+id, updateProductPartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productPartsService.remove(+id);
  }
}
