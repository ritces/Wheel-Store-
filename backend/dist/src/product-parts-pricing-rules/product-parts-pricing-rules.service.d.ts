import { CreateProductPartsPricingRuleDto } from './dto/create-product-parts-pricing-rule.dto';
import { UpdateProductPartsPricingRuleDto } from './dto/update-product-parts-pricing-rule.dto';
import { CreatePricingConditionDto } from './dto/create-pricing-condition.dto';
import { UpdatePricingConditionDto } from './dto/update-pricing-condition.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ProductPartsPricingRulesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProductPartsPricingRuleDto: CreateProductPartsPricingRuleDto): import(".prisma/client").Prisma.Prisma__pricing_rulesClient<{
        description: string | null;
        id: number;
        additional_price: import("@prisma/client/runtime/library").Decimal;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): Promise<{
        product_options_parts_names: string;
        pricing_conditions: {
            id: number;
            part_option_id: number;
            part_option: {
                name: string;
                id: number;
            };
        }[];
        description: string;
        id: number;
        additional_price: import("@prisma/client/runtime/library").Decimal;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__pricing_rulesClient<{
        pricing_conditions: {
            id: number;
            rule_id: number;
            part_option_id: number;
        }[];
    } & {
        description: string | null;
        id: number;
        additional_price: import("@prisma/client/runtime/library").Decimal;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, updateProductPartsPricingRuleDto: UpdateProductPartsPricingRuleDto): import(".prisma/client").Prisma.Prisma__pricing_rulesClient<{
        description: string | null;
        id: number;
        additional_price: import("@prisma/client/runtime/library").Decimal;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__pricing_rulesClient<{
        description: string | null;
        id: number;
        additional_price: import("@prisma/client/runtime/library").Decimal;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createPricingCondition(createPricingConditionDto: CreatePricingConditionDto): import(".prisma/client").Prisma.Prisma__pricing_conditionsClient<{
        id: number;
        rule_id: number;
        part_option_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getPricingConditions(id: number): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        rule_id: number;
        part_option_id: number;
    }[]>;
    updatePricingCondition(id: number, updatePricingConditionDto: UpdatePricingConditionDto): import(".prisma/client").Prisma.Prisma__pricing_conditionsClient<{
        id: number;
        rule_id: number;
        part_option_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deletePricingCondition(id: number): import(".prisma/client").Prisma.Prisma__pricing_conditionsClient<{
        id: number;
        rule_id: number;
        part_option_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getAllPricingConditions(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        rule_id: number;
        part_option_id: number;
        part_option: {
            name: string;
            id: number;
        };
        pricing_rule: {
            description: string;
            id: number;
            additional_price: import("@prisma/client/runtime/library").Decimal;
        };
    }[]>;
}
