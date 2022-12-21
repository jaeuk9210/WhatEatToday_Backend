-- CreateTable
CREATE TABLE "Verification" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "expiredAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);
