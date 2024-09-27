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
exports.ProductPartsController = void 0;
const common_1 = require("@nestjs/common");
const product_parts_service_1 = require("./product-parts.service");
const create_product_part_dto_1 = require("./dto/create-product-part.dto");
const update_product_part_dto_1 = require("./dto/update-product-part.dto");
let ProductPartsController = class ProductPartsController {
    constructor(productPartsService) {
        this.productPartsService = productPartsService;
    }
    create(createProductPartDto) {
        return this.productPartsService.create(createProductPartDto);
    }
    findAll() {
        return this.productPartsService.findAll();
    }
    findOne(id) {
        return this.productPartsService.findOne(+id);
    }
    update(id, updateProductPartDto) {
        return this.productPartsService.update(+id, updateProductPartDto);
    }
    remove(id) {
        return this.productPartsService.remove(+id);
    }
};
exports.ProductPartsController = ProductPartsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_part_dto_1.CreateProductPartDto]),
    __metadata("design:returntype", void 0)
], ProductPartsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductPartsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductPartsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_part_dto_1.UpdateProductPartDto]),
    __metadata("design:returntype", void 0)
], ProductPartsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductPartsController.prototype, "remove", null);
exports.ProductPartsController = ProductPartsController = __decorate([
    (0, common_1.Controller)('product-parts'),
    __metadata("design:paramtypes", [product_parts_service_1.ProductPartsService])
], ProductPartsController);
//# sourceMappingURL=product-parts.controller.js.map