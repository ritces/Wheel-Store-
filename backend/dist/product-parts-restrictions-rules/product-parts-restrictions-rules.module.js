"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPartsRestrictionsRulesModule = void 0;
const common_1 = require("@nestjs/common");
const product_parts_restrictions_rules_service_1 = require("./product-parts-restrictions-rules.service");
const product_parts_restrictions_rules_controller_1 = require("./product-parts-restrictions-rules.controller");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductPartsRestrictionsRulesModule = class ProductPartsRestrictionsRulesModule {
};
exports.ProductPartsRestrictionsRulesModule = ProductPartsRestrictionsRulesModule;
exports.ProductPartsRestrictionsRulesModule = ProductPartsRestrictionsRulesModule = __decorate([
    (0, common_1.Module)({
        controllers: [product_parts_restrictions_rules_controller_1.ProductPartsRestrictionsRulesController],
        providers: [product_parts_restrictions_rules_service_1.ProductPartsRestrictionsRulesService, prisma_service_1.PrismaService],
    })
], ProductPartsRestrictionsRulesModule);
//# sourceMappingURL=product-parts-restrictions-rules.module.js.map