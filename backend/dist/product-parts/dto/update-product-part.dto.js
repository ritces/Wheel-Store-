"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductPartDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_product_part_dto_1 = require("./create-product-part.dto");
class UpdateProductPartDto extends (0, swagger_1.PartialType)(create_product_part_dto_1.CreateProductPartDto) {
}
exports.UpdateProductPartDto = UpdateProductPartDto;
//# sourceMappingURL=update-product-part.dto.js.map