"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductObjectPipe = void 0;
const common_1 = require("@nestjs/common");
let ProductObjectPipe = class ProductObjectPipe {
    transform(value, metadata) {
        if (value.price) {
            value.price = parseFloat(value.price);
        }
        if (value.stock_quantity) {
            value.stock_quantity = parseInt(value.stock_quantity, 10);
        }
        return value;
    }
};
exports.ProductObjectPipe = ProductObjectPipe;
exports.ProductObjectPipe = ProductObjectPipe = __decorate([
    (0, common_1.Injectable)()
], ProductObjectPipe);
//# sourceMappingURL=product-object.pipe.js.map