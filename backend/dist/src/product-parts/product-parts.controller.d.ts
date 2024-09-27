import { ProductPartsService } from './product-parts.service';
import { CreateProductPartDto } from './dto/create-product-part.dto';
import { UpdateProductPartDto } from './dto/update-product-part.dto';
export declare class ProductPartsController {
    private readonly productPartsService;
    constructor(productPartsService: ProductPartsService);
    create(createProductPartDto: CreateProductPartDto): import(".prisma/client").Prisma.Prisma__partsClient<{
        name: string;
        id: number;
        product_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): Promise<{
        product_name: string;
        product: {
            name: string;
            description: string | null;
            price: import("@prisma/client/runtime/library").Decimal;
            stock_quantity: number;
            type: string;
            id: number;
            image_path: string | null;
        };
        name: string;
        id: number;
        product_id: number;
    }[]>;
    findOne(id: string): {
        product_name: string;
        product<T extends import(".prisma/client").Prisma.productsDefaultArgs<import("@prisma/client/runtime/library").DefaultArgs> = {}>(args?: import(".prisma/client").Prisma.Subset<T, import(".prisma/client").Prisma.productsDefaultArgs<import("@prisma/client/runtime/library").DefaultArgs>>): import(".prisma/client").Prisma.Prisma__productsClient<import("@prisma/client/runtime/library").GetFindResult<import(".prisma/client").Prisma.$productsPayload<import("@prisma/client/runtime/library").DefaultArgs>, T, {}>, null, import("@prisma/client/runtime/library").DefaultArgs>;
        part_options<T extends import(".prisma/client").Prisma.parts$part_optionsArgs<import("@prisma/client/runtime/library").DefaultArgs> = {}>(args?: import(".prisma/client").Prisma.Subset<T, import(".prisma/client").Prisma.parts$part_optionsArgs<import("@prisma/client/runtime/library").DefaultArgs>>): import(".prisma/client").Prisma.PrismaPromise<import("@prisma/client/runtime/library").GetFindResult<import(".prisma/client").Prisma.$part_optionsPayload<import("@prisma/client/runtime/library").DefaultArgs>, T, {}>[]>;
        then<TResult1 = {
            product: {
                name: string;
                description: string | null;
                price: import("@prisma/client/runtime/library").Decimal;
                stock_quantity: number;
                type: string;
                id: number;
                image_path: string | null;
            };
        } & {
            name: string;
            id: number;
            product_id: number;
        }, TResult2 = never>(onfulfilled?: (value: {
            product: {
                name: string;
                description: string | null;
                price: import("@prisma/client/runtime/library").Decimal;
                stock_quantity: number;
                type: string;
                id: number;
                image_path: string | null;
            };
        } & {
            name: string;
            id: number;
            product_id: number;
        }) => TResult1 | PromiseLike<TResult1>, onrejected?: (reason: any) => TResult2 | PromiseLike<TResult2>): Promise<TResult1 | TResult2>;
        catch<TResult = never>(onrejected?: (reason: any) => TResult | PromiseLike<TResult>): Promise<({
            product: {
                name: string;
                description: string | null;
                price: import("@prisma/client/runtime/library").Decimal;
                stock_quantity: number;
                type: string;
                id: number;
                image_path: string | null;
            };
        } & {
            name: string;
            id: number;
            product_id: number;
        }) | TResult>;
        finally(onfinally?: (() => void) | undefined | null): Promise<{
            product: {
                name: string;
                description: string | null;
                price: import("@prisma/client/runtime/library").Decimal;
                stock_quantity: number;
                type: string;
                id: number;
                image_path: string | null;
            };
        } & {
            name: string;
            id: number;
            product_id: number;
        }>;
        [Symbol.toStringTag]: "PrismaPromise";
    };
    update(id: string, updateProductPartDto: UpdateProductPartDto): import(".prisma/client").Prisma.Prisma__partsClient<{
        name: string;
        id: number;
        product_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__partsClient<{
        name: string;
        id: number;
        product_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
