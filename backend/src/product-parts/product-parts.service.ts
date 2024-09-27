import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductPartDto } from './dto/create-product-part.dto';
import { UpdateProductPartDto } from './dto/update-product-part.dto';

@Injectable()
export class ProductPartsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new part
   * @param createProductPartDto - The data to create the part with
   * @returns The created part
   */
  create(createProductPartDto: CreateProductPartDto) {
    return this.prisma.parts.create({ data: createProductPartDto });
  }

  /**
   * Find all parts
   * @returns The parts
   */
  async findAll() {
    const parts = await this.prisma.parts.findMany({
      include: { product: true },
    });
    const partsWithProductName = parts.map((part) => {
      return { ...part, product_name: part.product.name };
    });
    return partsWithProductName;
  }

  /**
   * Find a part by ID
   * @param id - The ID of the part to find
   * @returns The part
   */
  findOne(id: number) {
    const part = this.prisma.parts.findUnique({
      where: { id },
      include: { product: true },
    });
    const partWithProductName = { ...part, product_name: part.product.name };
    return partWithProductName;
  }

  /**
   * Update a part by ID
   * @param id - The ID of the part to update
   * @param updateProductPartDto - The data to update the part with
   * @returns The updated part
   */
  update(id: number, updateProductPartDto: UpdateProductPartDto) {
    return this.prisma.parts.update({
      where: { id },
      data: updateProductPartDto,
    });
  }

  /**
   * Delete a part by ID
   * @param id - The ID of the part to delete
   * @returns The deleted part
   */
  remove(id: number) {
    return this.prisma.parts.delete({
      where: { id },
    });
  }
}
