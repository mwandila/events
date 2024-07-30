-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('Draft', 'Published', 'Cancelled');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'Draft';
