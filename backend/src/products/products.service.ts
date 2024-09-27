import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Multer } from 'multer'; // Add this import
import { join } from 'path'; // Add this import
import { existsSync, mkdirSync, writeFileSync } from 'fs'; // Add this import

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new product
   * @param createProductDto - The data to create the product with
   * @param image - The image to upload
   * @returns The created product
   */
  async create(
    createProductDto: CreateProductDto,
    image: Multer.File, // Fix: Use Multer.File directly
  ) {
    // Define the upload folder path
    const uploadFolder = join(__dirname, '..', '..', 'uploads');

    // Check if the upload folder exists, if not, create it
    if (!existsSync(uploadFolder)) {
      mkdirSync(uploadFolder, { recursive: true });
    }

    // Save the image to the upload folder
    const uploadPath = join(uploadFolder, image.originalname);
    writeFileSync(uploadPath, image.buffer);

    // Store the file path in the database
    const imagePath = `/uploads/${image.originalname}`;

    return this.prisma.products.create({
      data: {
        ...createProductDto,
        image_path: imagePath, // Fix: Ensure the property name matches your database schema
      },
    });
  }

  /**
   * Find all products
   * @returns All products
   */
  findAll() {
    const products = this.prisma.products.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock_quantity: true,
        type: true,
        image_path: true, // Ensure this matches your database schema
      },
    });
    return products;
  }

  /**
   * Find a product by ID
   * @param id - The ID of the product to find
   * @returns The product
   */
  async findOne(id: number) {
    const product = await this.prisma.products.findUnique({
      where: { id },
      include: {
        parts: {
          include: {
            part_options: {
              select: {
                id: true,
                name: true,
                is_available: true,
                price: true,
                // Add any other fields you need from part_options
              },
            },
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Transform the data structure if needed
    const transformedProduct = {
      ...product,
      parts: product.parts.map((part) => ({
        id: part.id,
        name: part.name,
        // Include any other fields from the parts table you need
        options: part.part_options,
      })),
    };

    console.log(transformedProduct);
    return transformedProduct;
  }

  /**
   * Update a product by ID
   * @param id - The ID of the product to update
   * @param updateProductDto - The data to update the product with
   * @returns The updated product
   */
  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.products.update({
      where: { id },
      data: updateProductDto,
    });
  }

  /**
   * Delete a product by ID
   * @param id - The ID of the product to delete
   * @returns The deleted product
   */
  remove(id: number) {
    return this.prisma.products.delete({ where: { id } });
  }
}
