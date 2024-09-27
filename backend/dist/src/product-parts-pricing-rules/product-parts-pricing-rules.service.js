"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPartsPricingRulesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductPartsPricingRulesService = class ProductPartsPricingRulesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createProductPartsPricingRuleDto) {
        return this.prisma.pricing_rules.create({
            data: createProductPartsPricingRuleDto,
        });
    }
    async findAll() {
        const pricingRules = await this.prisma.pricing_rules.findMany({
            select: {
                id: true,
                description: true,
                additional_price: true,
                pricing_conditions: {
                    select: {
                        id: true,
                        part_option_id: true,
                        part_option: { select: { id: true, name: true } },
                    },
                },
            },
        });
        const pricingRulesWithPartOptionsNames = pricingRules.map((rule) => {
            return {
                ...rule,
                product_options_parts_names: rule.pricing_conditions
                    .map((condition) => condition.part_option.name)
                    .join(', '),
            };
        });
        return pricingRulesWithPartOptionsNames;
    }
    findOne(id) {
        return this.prisma.pricing_rules.findUnique({
            where: { id },
            include: { pricing_conditions: true },
        });
    }
    update(id, updateProductPartsPricingRuleDto) {
        return this.prisma.pricing_rules.update({
            where: { id },
            data: updateProductPartsPricingRuleDto,
        });
    }
    remove(id) {
        return this.prisma.pricing_rules.delete({
            where: { id },
        });
    }
    createPricingCondition(createPricingConditionDto) {
        return this.prisma.pricing_conditions.create({
            data: createPricingConditionDto,
        });
    }
    getPricingConditions(id) {
        return this.prisma.pricing_conditions.findMany({
            where: { rule_id: id },
        });
    }
    updatePricingCondition(id, updatePricingConditionDto) {
        return this.prisma.pricing_conditions.update({
            where: { id },
            data: updatePricingConditionDto,
        });
    }
    deletePricingCondition(id) {
        return this.prisma.pricing_conditions.delete({
            where: { id },
        });
    }
    getAllPricingConditions() {
        return this.prisma.pricing_conditions.findMany({
            select: {
                id: true,
                part_option_id: true,
                part_option: { select: { id: true, name: true } },
                pricing_rule: {
                    select: { id: true, description: true, additional_price: true },
                },
                rule_id: true,
            },
        });
    }
};
exports.ProductPartsPricingRulesService = ProductPartsPricingRulesService;
exports.ProductPartsPricingRulesService = ProductPartsPricingRulesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductPartsPricingRulesService);
//# sourceMappingURL=product-parts-pricing-rules.service.js.map