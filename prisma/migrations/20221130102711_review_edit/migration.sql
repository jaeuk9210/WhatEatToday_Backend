/*
  Warnings:

  - Added the required column `Cost` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Reorder` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Service` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Taste` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "Clean" INTEGER,
ADD COLUMN     "Cost" INTEGER NOT NULL,
ADD COLUMN     "Reorder" INTEGER NOT NULL,
ADD COLUMN     "Service" INTEGER NOT NULL,
ADD COLUMN     "Taste" INTEGER NOT NULL;
