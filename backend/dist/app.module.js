"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_service_1 = require("./prisma/prisma.service");
const products_module_1 = require("./products/products.module");
const product_part_options_module_1 = require("./product-part-options/product-part-options.module");
const product_parts_module_1 = require("./product-parts/product-parts.module");
const product_parts_pricing_rules_module_1 = require("./product-parts-pricing-rules/product-parts-pricing-rules.module");
const product_parts_restrictions_rules_module_1 = require("./product-parts-restrictions-rules/product-parts-restrictions-rules.module");
const stripe_module_1 = require("./stripe/stripe.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            products_module_1.ProductsModule,
            product_part_options_module_1.ProductPartOptionsModule,
            product_parts_module_1.ProductPartsModule,
            product_parts_pricing_rules_module_1.ProductPartsPricingRulesModule,
            product_parts_restrictions_rules_module_1.ProductPartsRestrictionsRulesModule,
            stripe_module_1.StripeModule.forRootAsync()
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map