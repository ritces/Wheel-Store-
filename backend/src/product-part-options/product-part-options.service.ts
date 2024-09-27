import { Injectable } from '@nestjs/common';
import { CreateProductPartOptionDto } from './dto/create-product-part-option.dto';
import { UpdateProductPartOptionDto } from './dto/update-product-part-option.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductPartOptionsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new part option
   * @param createProductPartOptionDto - The data to create the part option with
   * @returns The created part option
   */
  create(createProductPartOptionDto: CreateProductPartOptionDto) {
    return this.prisma.part_options.create({
      data: createProductPartOptionDto,
    });
  }

  /**
   * Find all part options
   * @returns The part options
   */
  async findAll() {
    const partOptions = await this.prisma.part_options.findMany({
      include: { part: true },
    });
    const partOptionsWithPartName = partOptions.map((partOption) => {
      return {
        ...partOption,
        part_name: partOption.part.name,
        is_available: partOption.is_available ? 'Yes' : 'No',
      };
    });

    return partOptionsWithPartName;
  }

  /**
   * Find a part option by ID
   * @param id - The ID of the part option to find
   * @returns The part option
   */
  findOne(id: number) {
    const partOption = this.prisma.part_options.findUnique({
      where: { id },
      include: { part: true },
    });

    const partOptionWithPartName = {
      ...partOption,
      part_name: partOption.part.name,
    };
    return partOptionWithPartName;
  }

  /**
   * Update a part option by ID
   * @param id - The ID of the part option to update
   * @param updateProductPartOptionDto - The data to update the part option with
   * @returns The updated part option
   */
  update(id: number, updateProductPartOptionDto: UpdateProductPartOptionDto) {
    return this.prisma.part_options.update({
      where: { id },
      data: updateProductPartOptionDto,
    });
  }

  /**
   * Delete a part option by ID
   * @param id - The ID of the part option to delete
   * @returns The deleted part option
   */
  remove(id: number) {
    return this.prisma.part_options.delete({
      where: { id },
    });
  }

  /**
   * Assign a pricing rule to a part option
   * @param id - The ID of the part option to assign the pricing rule to
   * @param pricingRuleId - The ID of the pricing rule to assign
   * @returns The updated part option
   */
  assignPricingRuleToPartOption(id: number, pricingRuleId: number) {
    return this.prisma.pricing_conditions.create({
      data: { part_option_id: id, rule_id: pricingRuleId },
    });
  }

  /**
   * Get all pricing rules assigned to a part option
   * @param id - The ID of the part option to get the pricing rules from
   * @returns The pricing rules
   */
  async getPricingRulesByPartOptionId(id: number) {
    const pricingRules = await this.prisma.pricing_conditions.findMany({
      where: { part_option_id: id },
      select: {
        id: true,
        pricing_rule: {
          select: {
            id: true,
            description: true,
            additional_price: true,
          },
        },
      },
    });
    const pricinRulesWithRuleDescription = pricingRules.map((rule) => {
      return {
        ...rule,
        rule_description: rule.pricing_rule.description,
        additional_price: rule.pricing_rule.additional_price,
      };
    });
    return pricinRulesWithRuleDescription;
  }

  /**
   * Unassign a pricing rule from a part option
   * @param id - The ID of the part option to unassign the pricing rule from
   * @param pricingRuleId - The ID of the pricing rule to unassign
   * @returns The updated part option
   */
  unassignPricingRuleFromPartOption(id: number, pricingRuleId: number) {
    return this.prisma.pricing_conditions.delete({
      where: { id: pricingRuleId, part_option_id: id },
    });
  }

  /**
   * Assign a restriction rule to a part option
   * @param id - The ID of the part option to assign the restriction rule to
   * @param restrictionRuleId - The ID of the restriction rule to assign
   * @returns The updated part option
   */
  assignRestrictionRuleToPartOption(id: number, restrictionRuleId: number) {
    return this.prisma.restriction_conditions.create({
      data: { part_option_id: id, rule_id: restrictionRuleId },
    });
  }

  /**
   * Unassign a restriction rule from a part option
   * @param id - The ID of the part option to unassign the restriction rule from
   * @param restrictionRuleId - The ID of the restriction rule to unassign
   * @returns The updated part option
   */
  unassignRestrictionRuleFromPartOption(id: number, restrictionRuleId: number) {
    return this.prisma.restriction_conditions.delete({
      where: { id: restrictionRuleId, part_option_id: id },
    });
  }

  /**
   * Get all restriction rules assigned to a part option
   * @param id - The ID of the part option to get the restriction rules from
   * @returns The restriction rules
   */
  async getRestrictionRulesByPartOptionId(id: number) {
    const restrictionRules = await this.prisma.restriction_conditions.findMany({
      where: { part_option_id: id },
      select: {
        id: true,
        restriction_rule: {
          select: {
            id: true,
            description: true,
          },
        },
      },
    });
    const restrictionRulesWithRuleDescription = restrictionRules.map((rule) => {
      return { ...rule, rule_description: rule.restriction_rule.description };
    });
    return restrictionRulesWithRuleDescription;
  }
}
