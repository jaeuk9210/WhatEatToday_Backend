/*
  Warnings:

  - The `monday` column on the `Time` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tuesday` column on the `Time` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `wednesday` column on the `Time` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `thursday` column on the `Time` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `friday` column on the `Time` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `saturday` column on the `Time` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sunday` column on the `Time` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Time" DROP COLUMN "monday",
ADD COLUMN     "monday" TIME,
DROP COLUMN "tuesday",
ADD COLUMN     "tuesday" TIME,
DROP COLUMN "wednesday",
ADD COLUMN     "wednesday" TIME,
DROP COLUMN "thursday",
ADD COLUMN     "thursday" TIME,
DROP COLUMN "friday",
ADD COLUMN     "friday" TIME,
DROP COLUMN "saturday",
ADD COLUMN     "saturday" TIME,
DROP COLUMN "sunday",
ADD COLUMN     "sunday" TIME;
