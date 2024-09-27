import { Module } from '@nestjs/common';
import { ProductPartsPricingRulesService } from './product-parts-pricing-rules.service';
import { ProductPartsPricingRulesController } from './product-parts-pricing-rules.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProductPartsPricingRulesController],
  providers: [ProductPartsPricingRulesService, PrismaService],
})
export class ProductPartsPricingRulesModule {}
