/*
  Warnings:

  - You are about to drop the `product_customizations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_customizations" DROP CONSTRAINT "product_customizations_part_option_id_fkey";

-- DropForeignKey
ALTER TABLE "product_customizations" DROP CONSTRAINT "product_customizations_product_id_fkey";

-- DropTable
DROP TABLE "product_customizations";
