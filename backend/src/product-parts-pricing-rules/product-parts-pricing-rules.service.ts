import { Injectable } from '@nestjs/common';
import { CreateProductPartsPricingRuleDto } from './dto/create-product-parts-pricing-rule.dto';
import { UpdateProductPartsPricingRuleDto } from './dto/update-product-parts-pricing-rule.dto';
import { CreatePricingConditionDto } from './dto/create-pricing-condition.dto';
import { UpdatePricingConditionDto } from './dto/update-pricing-condition.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductPartsPricingRulesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new pricing rule
   * @param createProductPartsPricingRuleDto - The data to create the pricing rule with
   * @returns The created pricing rule
   */
  create(createProductPartsPricingRuleDto: CreateProductPartsPricingRuleDto) {
    return this.prisma.pricing_rules.create({
      data: createProductPartsPricingRuleDto,
    });
  }

  /**
   * Find all pricing rules
   * @returns The pricing rules
   */
  async findAll() {
    const pricingRules = await this.prisma.pricing_rules.findMany({
      select: {
        id: true,
        description: true,
        additional_price: true,
        pricing_conditions: {
          select: {
            id: true,
            part_option_id: true,
            part_option: { select: { id: true, name: true } },
          },
        },
      },
    });
    const pricingRulesWithPartOptionsNames = pricingRules.map((rule) => {
      return {
        ...rule,
        product_options_parts_names: rule.pricing_conditions
          .map((condition) => condition.part_option.name)
          .join(', '),
      };
    });
    return pricingRulesWithPartOptionsNames;
  }

  /**
   * Find a pricing rule by ID
   * @param id - The ID of the pricing rule to find
   * @returns The pricing rule
   */
  findOne(id: number) {
    return this.prisma.pricing_rules.findUnique({
      where: { id },
      include: { pricing_conditions: true },
    });
  }

  /**
   * Update a pricing rule by ID
   * @param id - The ID of the pricing rule to update
   * @param updateProductPartsPricingRuleDto - The data to update the pricing rule with
   * @returns The updated pricing rule
   */
  update(
    id: number,
    updateProductPartsPricingRuleDto: UpdateProductPartsPricingRuleDto,
  ) {
    return this.prisma.pricing_rules.update({
      where: { id },
      data: updateProductPartsPricingRuleDto,
    });
  }

  /**
   * Delete a pricing rule by ID
   * @param id - The ID of the pricing rule to delete
   * @returns The deleted pricing rule
   */
  remove(id: number) {
    return this.prisma.pricing_rules.delete({
      where: { id },
    });
  }

  /**
   * Create a new pricing condition
   * @param createPricingConditionDto - The data to create the pricing condition with
   * @returns The created pricing condition
   */
  createPricingCondition(createPricingConditionDto: CreatePricingConditionDto) {
    return this.prisma.pricing_conditions.create({
      data: createPricingConditionDto,
    });
  }

  /**
   * Get all pricing conditions for a rule by ID
   * @param id - The ID of the rule to get the pricing conditions for
   * @returns The pricing conditions for the rule
   */
  getPricingConditions(id: number) {
    return this.prisma.pricing_conditions.findMany({
      where: { rule_id: id },
    });
  }

  /**
   * Update a pricing condition by ID
   * @param id - The ID of the pricing condition to update
   * @param updatePricingConditionDto - The data to update the pricing condition with
   * @returns The updated pricing condition
   */
  updatePricingCondition(
    id: number,
    updatePricingConditionDto: UpdatePricingConditionDto,
  ) {
    return this.prisma.pricing_conditions.update({
      where: { id },
      data: updatePricingConditionDto,
    });
  }

  /**
   * Delete a pricing condition by ID
   * @param id - The ID of the pricing condition to delete
   * @returns The deleted pricing condition
   */
  deletePricingCondition(id: number) {
    return this.prisma.pricing_conditions.delete({
      where: { id },
    });
  }

  /**
   * Get all pricing conditions
   * @returns All pricing conditions
   */
  getAllPricingConditions() {
    return this.prisma.pricing_conditions.findMany({
      select: {
        id: true,
        part_option_id: true,
        part_option: { select: { id: true, name: true } },
        pricing_rule: {
          select: { id: true, description: true, additional_price: true },
        },
        rule_id: true,
      },
    });
  }
}
