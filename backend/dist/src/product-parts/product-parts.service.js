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
exports.ProductPartsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductPartsService = class ProductPartsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createProductPartDto) {
        return this.prisma.parts.create({ data: createProductPartDto });
    }
    async findAll() {
        const parts = await this.prisma.parts.findMany({
            include: { product: true },
        });
        const partsWithProductName = parts.map((part) => {
            return { ...part, product_name: part.product.name };
        });
        return partsWithProductName;
    }
    findOne(id) {
        const part = this.prisma.parts.findUnique({
            where: { id },
            include: { product: true },
        });
        const partWithProductName = { ...part, product_name: part.product.name };
        return partWithProductName;
    }
    update(id, updateProductPartDto) {
        return this.prisma.parts.update({
            where: { id },
            data: updateProductPartDto,
        });
    }
    remove(id) {
        return this.prisma.parts.delete({
            where: { id },
        });
    }
};
exports.ProductPartsService = ProductPartsService;
exports.ProductPartsService = ProductPartsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductPartsService);
//# sourceMappingURL=product-parts.service.js.map