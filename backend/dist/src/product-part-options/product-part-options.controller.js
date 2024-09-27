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
exports.ProductPartOptionsController = void 0;
const common_1 = require("@nestjs/common");
const product_part_options_service_1 = require("./product-part-options.service");
const create_product_part_option_dto_1 = require("./dto/create-product-part-option.dto");
const update_product_part_option_dto_1 = require("./dto/update-product-part-option.dto");
let ProductPartOptionsController = class ProductPartOptionsController {
    constructor(productPartOptionsService) {
        this.productPartOptionsService = productPartOptionsService;
    }
    create(createProductPartOptionDto) {
        return this.productPartOptionsService.create(createProductPartOptionDto);
    }
    findAll() {
        return this.productPartOptionsService.findAll();
    }
    findOne(id) {
        return this.productPartOptionsService.findOne(+id);
    }
    update(id, updateProductPartOptionDto) {
        return this.productPartOptionsService.update(+id, updateProductPartOptionDto);
    }
    remove(id) {
        return this.productPartOptionsService.remove(+id);
    }
    assignPricingRuleToPartOption(id, pricingRuleId) {
        return this.productPartOptionsService.assignPricingRuleToPartOption(+id, +pricingRuleId);
    }
    getPricingRulesByPartOptionId(id) {
        return this.productPartOptionsService.getPricingRulesByPartOptionId(+id);
    }
    unassignPricingRuleFromPartOption(id, pricingRuleId) {
        return this.productPartOptionsService.unassignPricingRuleFromPartOption(+id, +pricingRuleId);
    }
    assignRestrictionRuleToPartOption(id, restrictionRuleId) {
        return this.productPartOptionsService.assignRestrictionRuleToPartOption(+id, +restrictionRuleId);
    }
    unassignRestrictionRuleFromPartOption(id, restrictionRuleId) {
        return this.productPartOptionsService.unassignRestrictionRuleFromPartOption(+id, +restrictionRuleId);
    }
    getRestrictionRulesByPartOptionId(id) {
        return this.productPartOptionsService.getRestrictionRulesByPartOptionId(+id);
    }
};
exports.ProductPartOptionsController = ProductPartOptionsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_part_option_dto_1.CreateProductPartOptionDto]),
    __metadata("design:returntype", void 0)
], ProductPartOptionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductPartOptionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductPartOptionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_part_option_dto_1.UpdateProductPartOptionDto]),
    __metadata("design:returntype", void 0)
], ProductPartOptionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductPartOptionsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/pricing-rules/:pricingRuleId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('pricingRuleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProductPartOptionsController.prototype, "assignPricingRuleToPartOption", null);
__decorate([
    (0, common_1.Get)(':id/pricing-rules'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductPartOptionsController.prototype, "getPricingRulesByPartOptionId", null);
__decorate([
    (0, common_1.Delete)(':id/pricing-rules/:pricingRuleId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('pricingRuleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProductPartOptionsController.prototype, "unassignPricingRuleFromPartOption", null);
__decorate([
    (0, common_1.Post)(':id/restriction-rules/:restrictionRuleId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('restrictionRuleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProductPartOptionsController.prototype, "assignRestrictionRuleToPartOption", null);
__decorate([
    (0, common_1.Delete)(':id/restriction-rules/:restrictionRuleId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('restrictionRuleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProductPartOptionsController.prototype, "unassignRestrictionRuleFromPartOption", null);
__decorate([
    (0, common_1.Get)(':id/restriction-rules'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductPartOptionsController.prototype, "getRestrictionRulesByPartOptionId", null);
exports.ProductPartOptionsController = ProductPartOptionsController = __decorate([
    (0, common_1.Controller)('product-parts/options'),
    __metadata("design:paramtypes", [product_part_options_service_1.ProductPartOptionsService])
], ProductPartOptionsController);
//# sourceMappingURL=product-part-options.controller.js.map