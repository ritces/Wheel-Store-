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
exports.ProductPartsRestrictionsRulesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductPartsRestrictionsRulesService = class ProductPartsRestrictionsRulesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createProductPartsRestrictionsRuleDto) {
        return this.prisma.restriction_rules.create({
            data: createProductPartsRestrictionsRuleDto,
        });
    }
    async findAll() {
        const restrictionRules = await this.prisma.restriction_rules.findMany({
            select: {
                id: true,
                description: true,
                restriction_conditions: {
                    select: {
                        id: true,
                        part_option_id: true,
                        part_option: { select: { id: true, name: true } },
                    },
                },
            },
        });
        const restrictrionRulesWithPartOptionsNames = restrictionRules.map((rule) => {
            return {
                ...rule,
                product_options_parts_names: rule.restriction_conditions
                    .map((condition) => condition.part_option.name)
                    .join(', '),
            };
        });
        return restrictrionRulesWithPartOptionsNames;
    }
    findOne(id) {
        console.log(id);
        return this.prisma.restriction_rules.findUnique({
            where: { id },
            include: {
                restriction_conditions: true,
            },
        });
    }
    update(id, updateProductPartsRestrictionsRuleDto) {
        return this.prisma.restriction_rules.update({
            where: { id },
            data: updateProductPartsRestrictionsRuleDto,
        });
    }
    remove(id) {
        return this.prisma.restriction_rules.delete({
            where: { id },
        });
    }
    createRestrictionCondition(createRestrictionConditionDto) {
        return this.prisma.restriction_conditions.create({
            data: createRestrictionConditionDto,
        });
    }
    getRestrictionConditions(id) {
        return this.prisma.restriction_conditions.findMany({
            where: { rule_id: id },
        });
    }
    updateRestrictionCondition(id, updateRestrictionConditionDto) {
        return this.prisma.restriction_conditions.update({
            where: { id },
            data: updateRestrictionConditionDto,
        });
    }
    deleteRestrictionCondition(id) {
        return this.prisma.restriction_conditions.delete({
            where: { id },
        });
    }
    getAllRestrictionConditions() {
        return this.prisma.restriction_conditions.findMany({
            select: {
                id: true,
                part_option_id: true,
                part_option: { select: { id: true, name: true } },
                restriction_rule: { select: { id: true, description: true } },
                rule_id: true,
            },
        });
    }
};
exports.ProductPartsRestrictionsRulesService = ProductPartsRestrictionsRulesService;
exports.ProductPartsRestrictionsRulesService = ProductPartsRestrictionsRulesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductPartsRestrictionsRulesService);
//# sourceMappingURL=product-parts-restrictions-rules.service.js.map