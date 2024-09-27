import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { ProductsModule } from './products/products.module';
import { ProductPartOptionsModule } from './product-part-options/product-part-options.module';
import { ProductPartsModule } from './product-parts/product-parts.module';
import { ProductPartsPricingRulesModule } from './product-parts-pricing-rules/product-parts-pricing-rules.module';
import { ProductPartsRestrictionsRulesModule } from './product-parts-restrictions-rules/product-parts-restrictions-rules.module';
import { StripeModule } from './stripe/stripe.module';
@Module({
  imports: [
    ProductsModule,
    ProductPartOptionsModule,
    ProductPartsModule,
    ProductPartsPricingRulesModule,
    ProductPartsRestrictionsRulesModule,
    StripeModule.forRootAsync()
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
