import { CreateProductPartsRestrictionsRuleDto } from './dto/create-product-parts-restrictions-rule.dto';
import { UpdateProductPartsRestrictionsRuleDto } from './dto/update-product-parts-restrictions-rule.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRestrictionConditionDto } from './dto/create-restriction-condition.dto';
import { UpdateRestrictionConditionDto } from './dto/update-restriction-condition.dto';
export declare class ProductPartsRestrictionsRulesService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): import(".prisma/client").Prisma.Prisma__restriction_rulesClient<{
        restriction_conditions: {
            id: number;
            rule_id: number;
            part_option_id: number;
        }[];
    } & {
        description: string | null;
        id: number;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, updateProductPartsRestrictionsRuleDto: UpdateProductPartsRestrictionsRuleDto): import(".prisma/client").Prisma.Prisma__restriction_rulesClient<{
        description: string | null;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__restriction_rulesClient<{
        description: string | null;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createRestrictionCondition(createRestrictionConditionDto: CreateRestrictionConditionDto): import(".prisma/client").Prisma.Prisma__restriction_conditionsClient<{
        id: number;
        rule_id: number;
        part_option_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getRestrictionConditions(id: number): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        rule_id: number;
        part_option_id: number;
    }[]>;
    updateRestrictionCondition(id: number, updateRestrictionConditionDto: UpdateRestrictionConditionDto): import(".prisma/client").Prisma.Prisma__restriction_conditionsClient<{
        id: number;
        rule_id: number;
        part_option_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteRestrictionCondition(id: number): import(".prisma/client").Prisma.Prisma__restriction_conditionsClient<{
        id: number;
        rule_id: number;
        part_option_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
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
}
