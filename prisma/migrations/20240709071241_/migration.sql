/*
  Warnings:

  - The values [POPULAR,EVENT,CONCERT] on the enum `EventCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EventCategory_new" AS ENUM ('WEDDING', 'FUNERAL', 'BUSINESS', 'MUSIC', 'SPORT', 'WEB_DEVELOPMENT', 'MARKETING', 'TECHNOLOGY', 'CONCERTS_AND_CHURCH', 'CONFERENCES_AND_WORKSHOPS', 'SPORTS_AND_FITNESS', 'ARTS_AND_THEATER', 'FAMILY_AND_KIDS', 'FOOD_AND_DRINK', 'CHARITY_AND_FUNDRAISERS', 'COMEDY_SHOWS', 'NETWORKING_AND_SOCIAL_GATHERINGS', 'FILM_SCREENINGS');
ALTER TABLE "Event" ALTER COLUMN "category" TYPE "EventCategory_new" USING ("category"::text::"EventCategory_new");
ALTER TYPE "EventCategory" RENAME TO "EventCategory_old";
ALTER TYPE "EventCategory_new" RENAME TO "EventCategory";
DROP TYPE "EventCategory_old";
COMMIT;
