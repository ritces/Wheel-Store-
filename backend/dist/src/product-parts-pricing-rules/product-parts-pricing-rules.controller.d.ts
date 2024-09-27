import { ProductPartsPricingRulesService } from './product-parts-pricing-rules.service';
import { CreateProductPartsPricingRuleDto } from './dto/create-product-parts-pricing-rule.dto';
import { UpdateProductPartsPricingRuleDto } from './dto/update-product-parts-pricing-rule.dto';
export declare class ProductPartsPricingRulesController {
    private readonly productPartsPricingRulesService;
    constructor(productPartsPricingRulesService: ProductPartsPricingRulesService);
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
    findOne(id: string): import(".prisma/client").Prisma.Prisma__pricing_rulesClient<{
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
    update(id: string, updateProductPartsPricingRuleDto: UpdateProductPartsPricingRuleDto): import(".prisma/client").Prisma.Prisma__pricing_rulesClient<{
        description: string | null;
        id: number;
        additional_price: import("@prisma/client/runtime/library").Decimal;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__pricing_rulesClient<{
        description: string | null;
        id: number;
        additional_price: import("@prisma/client/runtime/library").Decimal;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
