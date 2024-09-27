/*
  Warnings:

  - Added the required column `product_id` to the `parts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "parts" ADD COLUMN     "product_id" INTEGER NOT NULL;
