/*
  Warnings:

  - You are about to drop the column `date` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `timeEnd` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `timeStart` on the `Event` table. All the data in the column will be lost.
  - Added the required column `date_end` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_start` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_end` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_start` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "date",
DROP COLUMN "timeEnd",
DROP COLUMN "timeStart",
ADD COLUMN     "date_end" TEXT NOT NULL,
ADD COLUMN     "date_start" TEXT NOT NULL,
ADD COLUMN     "time_end" TEXT NOT NULL,
ADD COLUMN     "time_start" TEXT NOT NULL;
