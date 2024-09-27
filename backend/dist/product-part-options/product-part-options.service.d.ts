import { CreateProductPartOptionDto } from './dto/create-product-part-option.dto';
import { UpdateProductPartOptionDto } from './dto/update-product-part-option.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class ProductPartOptionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): {
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
    update(id: number, updateProductPartOptionDto: UpdateProductPartOptionDto): import(".prisma/client").Prisma.Prisma__part_optionsClient<{
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        id: number;
        part_id: number;
        is_available: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__part_optionsClient<{
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        id: number;
        part_id: number;
        is_available: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    assignPricingRuleToPartOption(id: number, pricingRuleId: number): import(".prisma/client").Prisma.Prisma__pricing_conditionsClient<{
        id: number;
        rule_id: number;
        part_option_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getPricingRulesByPartOptionId(id: number): Promise<{
        rule_description: string;
        additional_price: import("@prisma/client/runtime/library").Decimal;
        id: number;
        pricing_rule: {
            description: string;
            id: number;
            additional_price: import("@prisma/client/runtime/library").Decimal;
        };
    }[]>;
    unassignPricingRuleFromPartOption(id: number, pricingRuleId: number): import(".prisma/client").Prisma.Prisma__pricing_conditionsClient<{
        id: number;
        rule_id: number;
        part_option_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    assignRestrictionRuleToPartOption(id: number, restrictionRuleId: number): import(".prisma/client").Prisma.Prisma__restriction_conditionsClient<{
        id: number;
        rule_id: number;
        part_option_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    unassignRestrictionRuleFromPartOption(id: number, restrictionRuleId: number): import(".prisma/client").Prisma.Prisma__restriction_conditionsClient<{
        id: number;
        rule_id: number;
        part_option_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getRestrictionRulesByPartOptionId(id: number): Promise<{
        rule_description: string;
        id: number;
        restriction_rule: {
            description: string;
            id: number;
        };
    }[]>;
}
