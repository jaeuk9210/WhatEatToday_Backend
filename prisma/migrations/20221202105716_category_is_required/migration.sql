/*
  Warnings:

  - Made the column `category` on table `Menu` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subCategory` on table `Menu` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Menu" ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "subCategory" SET NOT NULL;
