-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'VENDOR';

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "isAvailableForPurchase" BOOLEAN NOT NULL DEFAULT true;
