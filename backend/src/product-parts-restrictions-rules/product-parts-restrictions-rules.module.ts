import { Module } from '@nestjs/common';
import { ProductPartsRestrictionsRulesService } from './product-parts-restrictions-rules.service';
import { ProductPartsRestrictionsRulesController } from './product-parts-restrictions-rules.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ProductPartsRestrictionsRulesController],
  providers: [ProductPartsRestrictionsRulesService, PrismaService],
})
export class ProductPartsRestrictionsRulesModule {}
