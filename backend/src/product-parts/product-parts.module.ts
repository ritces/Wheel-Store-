import { Module } from '@nestjs/common';
import { ProductPartsService } from './product-parts.service';
import { ProductPartsController } from './product-parts.controller';
import { PrismaService } from '../prisma/prisma.service';
@Module({
  controllers: [ProductPartsController],
  providers: [ProductPartsService, PrismaService],
})
export class ProductPartsModule {}
