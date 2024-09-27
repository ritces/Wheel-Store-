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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPartsPricingRulesController = void 0;
const common_1 = require("@nestjs/common");
const product_parts_pricing_rules_service_1 = require("./product-parts-pricing-rules.service");
const create_product_parts_pricing_rule_dto_1 = require("./dto/create-product-parts-pricing-rule.dto");
const update_product_parts_pricing_rule_dto_1 = require("./dto/update-product-parts-pricing-rule.dto");
let ProductPartsPricingRulesController = class ProductPartsPricingRulesController {
    constructor(productPartsPricingRulesService) {
        this.productPartsPricingRulesService = productPartsPricingRulesService;
    }
    getAllPricingConditions() {
        return this.productPartsPricingRulesService.getAllPricingConditions();
    }
    create(createProductPartsPricingRuleDto) {
        return this.productPartsPricingRulesService.create(createProductPartsPricingRuleDto);
    }
    findAll() {
        return this.productPartsPricingRulesService.findAll();
    }
    findOne(id) {
        return this.productPartsPricingRulesService.findOne(+id);
    }
    update(id, updateProductPartsPricingRuleDto) {
        return this.productPartsPricingRulesService.update(+id, updateProductPartsPricingRuleDto);
    }
    remove(id) {
        return this.productPartsPricingRulesService.remove(+id);
    }
};
exports.ProductPartsPricingRulesController = ProductPartsPricingRulesController;
__decorate([
    (0, common_1.Get)('/conditions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductPartsPricingRulesController.prototype, "getAllPricingConditions", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_parts_pricing_rule_dto_1.CreateProductPartsPricingRuleDto]),
    __metadata("design:returntype", void 0)
], ProductPartsPricingRulesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/conditions'),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductPartsPricingRulesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductPartsPricingRulesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_parts_pricing_rule_dto_1.UpdateProductPartsPricingRuleDto]),
    __metadata("design:returntype", void 0)
], ProductPartsPricingRulesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductPartsPricingRulesController.prototype, "remove", null);
exports.ProductPartsPricingRulesController = ProductPartsPricingRulesController = __decorate([
    (0, common_1.Controller)('pricing-rules'),
    __metadata("design:paramtypes", [product_parts_pricing_rules_service_1.ProductPartsPricingRulesService])
], ProductPartsPricingRulesController);
//# sourceMappingURL=product-parts-pricing-rules.controller.js.map