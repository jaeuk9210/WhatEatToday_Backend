/*
  Warnings:

  - You are about to drop the column `Clean` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `Cost` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `Reorder` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `Service` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `Taste` on the `Photo` table. All the data in the column will be lost.
  - Added the required column `cost` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reorder` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taste` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "Clean",
DROP COLUMN "Cost",
DROP COLUMN "Reorder",
DROP COLUMN "Service",
DROP COLUMN "Taste",
ADD COLUMN     "clean" INTEGER,
ADD COLUMN     "cost" INTEGER NOT NULL,
ADD COLUMN     "reorder" INTEGER NOT NULL,
ADD COLUMN     "service" INTEGER NOT NULL,
ADD COLUMN     "taste" INTEGER NOT NULL;
