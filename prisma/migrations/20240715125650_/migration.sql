-- CreateEnum
CREATE TYPE "SponsorshipTier" AS ENUM ('PLATINUM', 'GOLD', 'SILVER', 'BRONZE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isNewCustomer" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastPurchaseDate" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "AnalyticsEntry" (
    "id" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "ticketsSold" INTEGER NOT NULL,
    "ticketsUnsold" INTEGER NOT NULL,
    "refunds" INTEGER NOT NULL,
    "newCustomers" INTEGER NOT NULL,
    "existingCustomers" INTEGER NOT NULL,
    "engagements" INTEGER NOT NULL,
    "revenue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AnalyticsEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sponsor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "website" TEXT,
    "tier" "SponsorshipTier" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "eventId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sponsor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnalyticsEntry" ADD CONSTRAINT "AnalyticsEntry_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsor" ADD CONSTRAINT "Sponsor_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
