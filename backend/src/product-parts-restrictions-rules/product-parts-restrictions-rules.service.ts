import { Injectable } from '@nestjs/common';
import { CreateProductPartsRestrictionsRuleDto } from './dto/create-product-parts-restrictions-rule.dto';
import { UpdateProductPartsRestrictionsRuleDto } from './dto/update-product-parts-restrictions-rule.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRestrictionConditionDto } from './dto/create-restriction-condition.dto';
import { UpdateRestrictionConditionDto } from './dto/update-restriction-condition.dto';

@Injectable()
export class ProductPartsRestrictionsRulesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new restriction rule
   * @param createProductPartsRestrictionsRuleDto - The data to create the restriction rule with
   * @returns The created restriction rule
   */
  create(
    createProductPartsRestrictionsRuleDto: CreateProductPartsRestrictionsRuleDto,
  ) {
    return this.prisma.restriction_rules.create({
      data: createProductPartsRestrictionsRuleDto,
    });
  }

  /**
   * Find all restriction rules
   * @returns All restriction rules
   */
  async findAll() {
    const restrictionRules = await this.prisma.restriction_rules.findMany({
      select: {
        id: true,
        description: true,
        restriction_conditions: {
          select: {
            id: true,
            part_option_id: true,
            part_option: { select: { id: true, name: true } },
          },
        },
      },
    });
    const restrictrionRulesWithPartOptionsNames = restrictionRules.map(
      (rule) => {
        return {
          ...rule,
          product_options_parts_names: rule.restriction_conditions
            .map((condition) => condition.part_option.name)
            .join(', '),
        };
      },
    );
    return restrictrionRulesWithPartOptionsNames;
  }

  /**
   * Find a restriction rule by ID
   * @param id - The ID of the restriction rule to find
   * @returns The restriction rule
   */
  findOne(id: number) {
    console.log(id);
    return this.prisma.restriction_rules.findUnique({
      where: { id },
      include: {
        restriction_conditions: true,
      },
    });
  }

  /**
   * Update a restriction rule by ID
   * @param id - The ID of the restriction rule to update
   * @param updateProductPartsRestrictionsRuleDto - The data to update the restriction rule with
   * @returns The updated restriction rule
   */
  update(
    id: number,
    updateProductPartsRestrictionsRuleDto: UpdateProductPartsRestrictionsRuleDto,
  ) {
    return this.prisma.restriction_rules.update({
      where: { id },
      data: updateProductPartsRestrictionsRuleDto,
    });
  }

  /**
   * Delete a restriction rule by ID
   * @param id - The ID of the restriction rule to delete
   * @returns The deleted restriction rule
   */
  remove(id: number) {
    return this.prisma.restriction_rules.delete({
      where: { id },
    });
  }

  /**
   * Create a new restriction condition
   * @param createRestrictionConditionDto - The data to create the restriction condition with
   * @returns The created restriction condition
   */
  createRestrictionCondition(
    createRestrictionConditionDto: CreateRestrictionConditionDto,
  ) {
    return this.prisma.restriction_conditions.create({
      data: createRestrictionConditionDto,
    });
  }

  /**
   * Get all restriction conditions for a rule by ID
   * @param id - The ID of the rule to get the restriction conditions for
   * @returns The restriction conditions for the rule
   */
  getRestrictionConditions(id: number) {
    return this.prisma.restriction_conditions.findMany({
      where: { rule_id: id },
    });
  }

  /**
   * Update a restriction condition by ID
   * @param id - The ID of the restriction condition to update
   * @param updateRestrictionConditionDto - The data to update the restriction condition with
   * @returns The updated restriction condition
   */
  updateRestrictionCondition(
    id: number,
    updateRestrictionConditionDto: UpdateRestrictionConditionDto,
  ) {
    return this.prisma.restriction_conditions.update({
      where: { id },
      data: updateRestrictionConditionDto,
    });
  }

  /**
   * Delete a restriction condition by ID
   * @param id - The ID of the restriction condition to delete
   * @returns The deleted restriction condition
   */
  deleteRestrictionCondition(id: number) {
    return this.prisma.restriction_conditions.delete({
      where: { id },
    });
  }

  /**
   * Get all restriction conditions
   * @returns All restriction conditions
   */
  getAllRestrictionConditions() {
    return this.prisma.restriction_conditions.findMany({
      select: {
        id: true,
        part_option_id: true,
        part_option: { select: { id: true, name: true } },
        restriction_rule: { select: { id: true, description: true } },
        rule_id: true,
      },
    });
  }
}
