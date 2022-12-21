/*
  Warnings:

  - You are about to drop the column `photoId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `photoId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the `Photo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_HashtagToPhoto` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[reviewId,userId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reviewId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewId` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_photoId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_photoId_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_menuId_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_userId_fkey";

-- DropForeignKey
ALTER TABLE "_HashtagToPhoto" DROP CONSTRAINT "_HashtagToPhoto_A_fkey";

-- DropForeignKey
ALTER TABLE "_HashtagToPhoto" DROP CONSTRAINT "_HashtagToPhoto_B_fkey";

-- DropIndex
DROP INDEX "Like_photoId_userId_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "photoId",
ADD COLUMN     "reviewId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "photoId",
ADD COLUMN     "reviewId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "picture" TEXT;

-- DropTable
DROP TABLE "Photo";

-- DropTable
DROP TABLE "_HashtagToPhoto";

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "menuId" INTEGER NOT NULL,
    "file" TEXT[],
    "caption" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "taste" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "reorder" INTEGER NOT NULL,
    "clean" INTEGER,
    "service" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HashtagToReview" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HashtagToReview_AB_unique" ON "_HashtagToReview"("A", "B");

-- CreateIndex
CREATE INDEX "_HashtagToReview_B_index" ON "_HashtagToReview"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Like_reviewId_userId_key" ON "Like"("reviewId", "userId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashtagToReview" ADD CONSTRAINT "_HashtagToReview_A_fkey" FOREIGN KEY ("A") REFERENCES "Hashtag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashtagToReview" ADD CONSTRAINT "_HashtagToReview_B_fkey" FOREIGN KEY ("B") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
