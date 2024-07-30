/*
  Warnings:

  - Added the required column `eventType` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('PHYSICAL', 'ONLINE');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "eventType" "EventType" NOT NULL,
ADD COLUMN     "isFree" BOOLEAN NOT NULL DEFAULT false;
