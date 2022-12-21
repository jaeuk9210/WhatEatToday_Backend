-- CreateEnum
CREATE TYPE "Delivery" AS ENUM ('pickup', 'delivery', 'here');

-- AlterTable
ALTER TABLE "Place" ADD COLUMN     "delivery" "Delivery"[] DEFAULT ARRAY['here']::"Delivery"[];
