/*
  Warnings:

  - You are about to drop the column `price` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `seats` on the `Event` table. All the data in the column will be lost.
  - Added the required column `regularPrice` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalSeats` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vipPrice` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vipSeats` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "price",
DROP COLUMN "seats",
ADD COLUMN     "regularPrice" INTEGER NOT NULL,
ADD COLUMN     "totalSeats" INTEGER NOT NULL,
ADD COLUMN     "vipPrice" INTEGER NOT NULL,
ADD COLUMN     "vipSeats" INTEGER NOT NULL;
