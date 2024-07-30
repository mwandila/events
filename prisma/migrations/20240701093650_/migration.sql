/*
  Warnings:

  - You are about to drop the column `isAvailableForPurchase` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "isAvailableForPurchase",
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true;
