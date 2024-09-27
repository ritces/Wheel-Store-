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
exports.ProductPartsRestrictionsRulesController = void 0;
const common_1 = require("@nestjs/common");
const product_parts_restrictions_rules_service_1 = require("./product-parts-restrictions-rules.service");
const create_product_parts_restrictions_rule_dto_1 = require("./dto/create-product-parts-restrictions-rule.dto");
const update_product_parts_restrictions_rule_dto_1 = require("./dto/update-product-parts-restrictions-rule.dto");
let ProductPartsRestrictionsRulesController = class ProductPartsRestrictionsRulesController {
    constructor(productPartsRestrictionsRulesService) {
        this.productPartsRestrictionsRulesService = productPartsRestrictionsRulesService;
    }
    getAllRestrictionConditions() {
        return this.productPartsRestrictionsRulesService.getAllRestrictionConditions();
    }
    create(createProductPartsRestrictionsRuleDto) {
        return this.productPartsRestrictionsRulesService.create(createProductPartsRestrictionsRuleDto);
    }
    findAll() {
        return this.productPartsRestrictionsRulesService.findAll();
    }
    findOne(id) {
        return this.productPartsRestrictionsRulesService.findOne(+id);
    }
    update(id, updateProductPartsRestrictionsRuleDto) {
        return this.productPartsRestrictionsRulesService.update(+id, updateProductPartsRestrictionsRuleDto);
    }
    remove(id) {
        return this.productPartsRestrictionsRulesService.remove(+id);
    }
};
exports.ProductPartsRestrictionsRulesController = ProductPartsRestrictionsRulesController;
__decorate([
    (0, common_1.Get)('/conditions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductPartsRestrictionsRulesController.prototype, "getAllRestrictionConditions", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_parts_restrictions_rule_dto_1.CreateProductPartsRestrictionsRuleDto]),
    __metadata("design:returntype", void 0)
], ProductPartsRestrictionsRulesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductPartsRestrictionsRulesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductPartsRestrictionsRulesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_parts_restrictions_rule_dto_1.UpdateProductPartsRestrictionsRuleDto]),
    __metadata("design:returntype", void 0)
], ProductPartsRestrictionsRulesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductPartsRestrictionsRulesController.prototype, "remove", null);
exports.ProductPartsRestrictionsRulesController = ProductPartsRestrictionsRulesController = __decorate([
    (0, common_1.Controller)('restriction-rules'),
    __metadata("design:paramtypes", [product_parts_restrictions_rules_service_1.ProductPartsRestrictionsRulesService])
], ProductPartsRestrictionsRulesController);
//# sourceMappingURL=product-parts-restrictions-rules.controller.js.map