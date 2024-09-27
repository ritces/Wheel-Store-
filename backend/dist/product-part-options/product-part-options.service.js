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
exports.ProductPartOptionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductPartOptionsService = class ProductPartOptionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createProductPartOptionDto) {
        return this.prisma.part_options.create({
            data: createProductPartOptionDto,
        });
    }
    async findAll() {
        const partOptions = await this.prisma.part_options.findMany({
            include: { part: true },
        });
        const partOptionsWithPartName = partOptions.map((partOption) => {
            return {
                ...partOption,
                part_name: partOption.part.name,
                is_available: partOption.is_available ? 'Yes' : 'No',
            };
        });
        return partOptionsWithPartName;
    }
    findOne(id) {
        const partOption = this.prisma.part_options.findUnique({
            where: { id },
            include: { part: true },
        });
        const partOptionWithPartName = {
            ...partOption,
            part_name: partOption.part.name,
        };
        return partOptionWithPartName;
    }
    update(id, updateProductPartOptionDto) {
        return this.prisma.part_options.update({
            where: { id },
            data: updateProductPartOptionDto,
        });
    }
    remove(id) {
        return this.prisma.part_options.delete({
            where: { id },
        });
    }
    assignPricingRuleToPartOption(id, pricingRuleId) {
        return this.prisma.pricing_conditions.create({
            data: { part_option_id: id, rule_id: pricingRuleId },
        });
    }
    async getPricingRulesByPartOptionId(id) {
        const pricingRules = await this.prisma.pricing_conditions.findMany({
            where: { part_option_id: id },
            select: {
                id: true,
                pricing_rule: {
                    select: {
                        id: true,
                        description: true,
                        additional_price: true,
                    },
                },
            },
        });
        const pricinRulesWithRuleDescription = pricingRules.map((rule) => {
            return {
                ...rule,
                rule_description: rule.pricing_rule.description,
                additional_price: rule.pricing_rule.additional_price,
            };
        });
        return pricinRulesWithRuleDescription;
    }
    unassignPricingRuleFromPartOption(id, pricingRuleId) {
        return this.prisma.pricing_conditions.delete({
            where: { id: pricingRuleId, part_option_id: id },
        });
    }
    assignRestrictionRuleToPartOption(id, restrictionRuleId) {
        return this.prisma.restriction_conditions.create({
            data: { part_option_id: id, rule_id: restrictionRuleId },
        });
    }
    unassignRestrictionRuleFromPartOption(id, restrictionRuleId) {
        return this.prisma.restriction_conditions.delete({
            where: { id: restrictionRuleId, part_option_id: id },
        });
    }
    async getRestrictionRulesByPartOptionId(id) {
        const restrictionRules = await this.prisma.restriction_conditions.findMany({
            where: { part_option_id: id },
            select: {
                id: true,
                restriction_rule: {
                    select: {
                        id: true,
                        description: true,
                    },
                },
            },
        });
        const restrictionRulesWithRuleDescription = restrictionRules.map((rule) => {
            return { ...rule, rule_description: rule.restriction_rule.description };
        });
        return restrictionRulesWithRuleDescription;
    }
};
exports.ProductPartOptionsService = ProductPartOptionsService;
exports.ProductPartOptionsService = ProductPartOptionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductPartOptionsService);
//# sourceMappingURL=product-part-options.service.js.map