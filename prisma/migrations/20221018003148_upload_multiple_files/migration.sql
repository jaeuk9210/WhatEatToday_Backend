/*
  Warnings:

  - The `file` column on the `Photo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "file",
ADD COLUMN     "file" TEXT[];
