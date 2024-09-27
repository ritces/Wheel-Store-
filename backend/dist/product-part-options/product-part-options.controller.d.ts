import { ProductPartOptionsService } from './product-part-options.service';
import { CreateProductPartOptionDto } from './dto/create-product-part-option.dto';
import { UpdateProductPartOptionDto } from './dto/update-product-part-option.dto';
export declare class ProductPartOptionsController {
    private readonly productPartOptionsService;
    constructor(productPartOptionsService: ProductPartOptionsService);
    create(createProductPartOptionDto: CreateProductPartOptionDto): import(".prisma/client").Prisma.Prisma__part_optionsClient<{
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        id: number;
        part_id: number;
        is_available: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): Promise<{
        part_name: string;
        is_available: string;
        part: {
            name: string;
            id: number;
            product_id: number;
        };
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        id: number;
        part_id: number;
    }[]>;
    findOne(id: string): {
        part_name: string;
        part<T extends import(".prisma/client").Prisma.partsDefaultArgs<import("@prisma/client/runtime/library").DefaultArgs> = {}>(args?: import(".prisma/client").Prisma.Subset<T, import(".prisma/client").Prisma.partsDefaultArgs<import("@prisma/client/runtime/library").DefaultArgs>>): import(".prisma/client").Prisma.Prisma__partsClient<import("@prisma/client/runtime/library").GetFindResult<import(".prisma/client").Prisma.$partsPayload<import("@prisma/client/runtime/library").DefaultArgs>, T, {}>, null, import("@prisma/client/runtime/library").DefaultArgs>;
        pricing_conditions<T extends import(".prisma/client").Prisma.part_options$pricing_conditionsArgs<import("@prisma/client/runtime/library").DefaultArgs> = {}>(args?: import(".prisma/client").Prisma.Subset<T, import(".prisma/client").Prisma.part_options$pricing_conditionsArgs<import("@prisma/client/runtime/library").DefaultArgs>>): import(".prisma/client").Prisma.PrismaPromise<import("@prisma/client/runtime/library").GetFindResult<import(".prisma/client").Prisma.$pricing_conditionsPayload<import("@prisma/client/runtime/library").DefaultArgs>, T, {}>[]>;
        product_customizations<T extends import(".prisma/client").Prisma.part_options$product_customizationsArgs<import("@prisma/client/runtime/library").DefaultArgs> = {}>(args?: import(".prisma/client").Prisma.Subset<T, import(".prisma/client").Prisma.part_options$product_customizationsArgs<import("@prisma/client/runtime/library").DefaultArgs>>): import(".prisma/client").Prisma.PrismaPromise<import("@prisma/client/runtime/library").GetFindResult<import(".prisma/client").Prisma.$product_customizationsPayload<import("@prisma/client/runtime/library").DefaultArgs>, T, {}>[]>;
        restriction_conditions<T extends import(".prisma/client").Prisma.part_options$restriction_conditionsArgs<import("@prisma/client/runtime/library").DefaultArgs> = {}>(args?: import(".prisma/client").Prisma.Subset<T, import(".prisma/client").Prisma.part_options$restriction_conditionsArgs<import("@prisma/client/runtime/library").DefaultArgs>>): import(".prisma/client").Prisma.PrismaPromise<import("@prisma/client/runtime/library").GetFindResult<import(".prisma/client").Prisma.$restriction_conditionsPayload<import("@prisma/client/runtime/library").DefaultArgs>, T, {}>[]>;
        then<TResult1 = {
            part: {
                name: string;
                id: number;
                product_id: number;
            };
        } & {
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
            id: number;
            part_id: number;
            is_available: boolean;
        }, TResult2 = never>(onfulfilled?: (value: {
            part: {
                name: string;
                id: number;
                product_id: number;
            };
        } & {
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
            id: number;
            part_id: number;
            is_available: boolean;
        }) => TResult1 | PromiseLike<TResult1>, onrejected?: (reason: any) => TResult2 | PromiseLike<TResult2>): Promise<TResult1 | TResult2>;
        catch<TResult = never>(onrejected?: (reason: any) => TResult | PromiseLike<TResult>): Promise<({
            part: {
                name: string;
                id: number;
                product_id: number;
            };
        } & {
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
            id: number;
            part_id: number;
            is_available: boolean;
        }) | TResult>;
        finally(onfinally?: (() => void) | undefined | null): Promise<{
            part: {
                name: string;
                id: number;
                product_id: number;
            };
        } & {
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
            id: number;
            part_id: number;
            is_available: boolean;
        }>;
        [Symbol.toStringTag]: "PrismaPromise";
    };
    update(id: string, updateProductPartOptionDto: UpdateProductPartOptionDto): import(".prisma/client").Prisma.Prisma__part_optionsClient<{
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        id: number;
        part_id: number;
        is_available: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__part_optionsClient<{
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        id: number;
        part_id: number;
        is_available: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    assignPricingRuleToPartOption(id: string, pricingRuleId: string): import(".prisma/client").Prisma.Prisma__pricing_conditionsClient<{
        id: number;
        rule_id: number;
        part_option_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getPricingRulesByPartOptionId(id: string): Promise<{
        rule_description: string;
        additional_price: import("@prisma/client/runtime/library").Decimal;
        id: number;
        pricing_rule: {
            description: string;
            id: number;
            additional_price: import("@prisma/client/runtime/library").Decimal;
        };
    }[]>;
    unassignPricingRuleFromPartOption(id: string, pricingRuleId: string): import(".prisma/client").Prisma.Prisma__pricing_conditionsClient<{
        id: number;
        rule_id: number;
        part_option_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    assignRestrictionRuleToPartOption(id: string, restrictionRuleId: string): import(".prisma/client").Prisma.Prisma__restriction_conditionsClient<{
        id: number;
        rule_id: number;
        part_option_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    unassignRestrictionRuleFromPartOption(id: string, restrictionRuleId: string): import(".prisma/client").Prisma.Prisma__restriction_conditionsClient<{
        id: number;
        rule_id: number;
        part_option_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getRestrictionRulesByPartOptionId(id: string): Promise<{
        rule_description: string;
        id: number;
        restriction_rule: {
            description: string;
            id: number;
        };
    }[]>;
}
