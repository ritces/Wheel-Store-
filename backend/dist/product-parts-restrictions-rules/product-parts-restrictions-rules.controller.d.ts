import { ProductPartsRestrictionsRulesService } from './product-parts-restrictions-rules.service';
import { CreateProductPartsRestrictionsRuleDto } from './dto/create-product-parts-restrictions-rule.dto';
import { UpdateProductPartsRestrictionsRuleDto } from './dto/update-product-parts-restrictions-rule.dto';
export declare class ProductPartsRestrictionsRulesController {
    private readonly productPartsRestrictionsRulesService;
    constructor(productPartsRestrictionsRulesService: ProductPartsRestrictionsRulesService);
    getAllRestrictionConditions(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        rule_id: number;
        part_option_id: number;
        part_option: {
            name: string;
            id: number;
        };
        restriction_rule: {
            description: string;
            id: number;
        };
    }[]>;
    create(createProductPartsRestrictionsRuleDto: CreateProductPartsRestrictionsRuleDto): import(".prisma/client").Prisma.Prisma__restriction_rulesClient<{
        description: string | null;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): Promise<{
        product_options_parts_names: string;
        restriction_conditions: {
            id: number;
            part_option_id: number;
            part_option: {
                name: string;
                id: number;
            };
        }[];
        description: string;
        id: number;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__restriction_rulesClient<{
        restriction_conditions: {
            id: number;
            rule_id: number;
            part_option_id: number;
        }[];
    } & {
        description: string | null;
        id: number;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateProductPartsRestrictionsRuleDto: UpdateProductPartsRestrictionsRuleDto): import(".prisma/client").Prisma.Prisma__restriction_rulesClient<{
        description: string | null;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__restriction_rulesClient<{
        description: string | null;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
