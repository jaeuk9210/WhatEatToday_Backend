/*
  Warnings:

  - The primary key for the `Time` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `friday` on the `Time` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Time` table. All the data in the column will be lost.
  - You are about to drop the column `monday` on the `Time` table. All the data in the column will be lost.
  - You are about to drop the column `saturday` on the `Time` table. All the data in the column will be lost.
  - You are about to drop the column `sunday` on the `Time` table. All the data in the column will be lost.
  - You are about to drop the column `thursday` on the `Time` table. All the data in the column will be lost.
  - You are about to drop the column `timeType` on the `Time` table. All the data in the column will be lost.
  - You are about to drop the column `tuesday` on the `Time` table. All the data in the column will be lost.
  - You are about to drop the column `wednesday` on the `Time` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[placeId,weekday]` on the table `Time` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `weekday` to the `Time` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WeekDay" AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');

-- DropIndex
DROP INDEX "Time_placeId_timeType_key";

-- AlterTable
ALTER TABLE "Time" DROP CONSTRAINT "Time_pkey",
DROP COLUMN "friday",
DROP COLUMN "id",
DROP COLUMN "monday",
DROP COLUMN "saturday",
DROP COLUMN "sunday",
DROP COLUMN "thursday",
DROP COLUMN "timeType",
DROP COLUMN "tuesday",
DROP COLUMN "wednesday",
ADD COLUMN     "close" TIMETZ,
ADD COLUMN     "open" TIMETZ,
ADD COLUMN     "weekday" "WeekDay" NOT NULL;

-- DropEnum
DROP TYPE "TimeType";

-- CreateIndex
CREATE UNIQUE INDEX "Time_placeId_weekday_key" ON "Time"("placeId", "weekday");
