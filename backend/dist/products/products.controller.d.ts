import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Multer } from 'multer';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto, image: Multer.File): Promise<{
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock_quantity: number;
        type: string;
        id: number;
        image_path: string | null;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        description: string;
        price: import("@prisma/client/runtime/library").Decimal;
        stock_quantity: number;
        type: string;
        id: number;
        image_path: string;
    }[]>;
    findOne(id: string): Promise<{
        parts: {
            id: number;
            name: string;
            options: {
                name: string;
                price: import("@prisma/client/runtime/library").Decimal;
                id: number;
                is_available: boolean;
            }[];
        }[];
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock_quantity: number;
        type: string;
        id: number;
        image_path: string | null;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): import(".prisma/client").Prisma.Prisma__productsClient<{
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock_quantity: number;
        type: string;
        id: number;
        image_path: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__productsClient<{
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock_quantity: number;
        type: string;
        id: number;
        image_path: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
