/*
  Warnings:

  - Made the column `is_available` on table `part_options` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `part_options` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "part_options" ALTER COLUMN "is_available" SET NOT NULL,
ALTER COLUMN "is_available" SET DEFAULT false,
ALTER COLUMN "price" SET NOT NULL;
