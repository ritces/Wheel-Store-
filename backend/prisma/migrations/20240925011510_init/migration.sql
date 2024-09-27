/*
  Warnings:

  - You are about to drop the column `option_name` on the `part_options` table. All the data in the column will be lost.
  - Added the required column `name` to the `part_options` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "part_options" DROP COLUMN "option_name",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pricing_conditions" RENAME CONSTRAINT "conditional_pricing_conditions_pkey" TO "pricing_conditions_pkey";

-- AlterTable
ALTER TABLE "pricing_rules" RENAME CONSTRAINT "conditional_pricing_rules_pkey" TO "pricing_rules_pkey";

-- AlterTable
ALTER TABLE "restriction_conditions" RENAME CONSTRAINT "prohibited_combinations_conditions_pkey" TO "restriction_conditions_pkey";
