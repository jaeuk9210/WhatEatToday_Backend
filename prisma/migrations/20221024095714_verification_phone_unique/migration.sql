/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Verification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Verification_phone_key" ON "Verification"("phone");
