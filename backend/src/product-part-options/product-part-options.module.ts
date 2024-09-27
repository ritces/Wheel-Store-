import { Module } from '@nestjs/common';
import { ProductPartOptionsService } from './product-part-options.service';
import { ProductPartOptionsController } from './product-part-options.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ProductPartOptionsController],
  providers: [ProductPartOptionsService, PrismaService],
})
export class ProductPartOptionsModule {}
