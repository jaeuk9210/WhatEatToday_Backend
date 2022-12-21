/*
  Warnings:

  - Changed the type of `category` on the `Menu` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('korean', 'wastern', 'chinese', 'japanese', 'buffet', 'snack', 'cafe', 'pub');

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL;
