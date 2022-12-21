/*
  Warnings:

  - A unique constraint covering the columns `[placeId,name]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "TimeType" AS ENUM ('open', 'close');

-- CreateTable
CREATE TABLE "Time" (
    "id" SERIAL NOT NULL,
    "placeId" INTEGER NOT NULL,
    "timeType" "TimeType" NOT NULL,
    "monday" INTEGER,
    "tuesday" INTEGER,
    "wednesday" INTEGER,
    "thursday" INTEGER,
    "friday" INTEGER,
    "saturday" INTEGER,
    "sunday" INTEGER,

    CONSTRAINT "Time_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Time_placeId_timeType_key" ON "Time"("placeId", "timeType");

-- CreateIndex
CREATE UNIQUE INDEX "Menu_placeId_name_key" ON "Menu"("placeId", "name");

-- AddForeignKey
ALTER TABLE "Time" ADD CONSTRAINT "Time_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
