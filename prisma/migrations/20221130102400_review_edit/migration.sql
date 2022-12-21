/*
  Warnings:

  - You are about to drop the column `placeId` on the `Photo` table. All the data in the column will be lost.
  - Added the required column `menuId` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_placeId_fkey";

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "placeId",
ADD COLUMN     "menuId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
