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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const path_1 = require("path");
const fs_1 = require("fs");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductDto, image) {
        const uploadFolder = (0, path_1.join)(__dirname, '..', '..', 'uploads');
        if (!(0, fs_1.existsSync)(uploadFolder)) {
            (0, fs_1.mkdirSync)(uploadFolder, { recursive: true });
        }
        const uploadPath = (0, path_1.join)(uploadFolder, image.originalname);
        (0, fs_1.writeFileSync)(uploadPath, image.buffer);
        const imagePath = `/uploads/${image.originalname}`;
        return this.prisma.products.create({
            data: {
                ...createProductDto,
                image_path: imagePath,
            },
        });
    }
    findAll() {
        const products = this.prisma.products.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                stock_quantity: true,
                type: true,
                image_path: true,
            },
        });
        return products;
    }
    async findOne(id) {
        const product = await this.prisma.products.findUnique({
            where: { id },
            include: {
                parts: {
                    include: {
                        part_options: {
                            select: {
                                id: true,
                                name: true,
                                is_available: true,
                                price: true,
                            },
                        },
                    },
                },
            },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        const transformedProduct = {
            ...product,
            parts: product.parts.map((part) => ({
                id: part.id,
                name: part.name,
                options: part.part_options,
            })),
        };
        console.log(transformedProduct);
        return transformedProduct;
    }
    update(id, updateProductDto) {
        return this.prisma.products.update({
            where: { id },
            data: updateProductDto,
        });
    }
    remove(id) {
        return this.prisma.products.delete({ where: { id } });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map