import { z } from 'zod';

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  file => file.size === 0 || file.type.startsWith("image/"),
  { message: "File must be an image" }
);

export const eventSchema = z.object({
  image: imageSchema.refine(file => file.size > 0, { message: "Required" }),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  dateStart: z.string().min(1, { message: "Date start is required" }),
  dateEnd: z.string().min(1, { message: "Date end is required" }),
  location: z.string().min(1, { message: "Location is required" }).optional(),
  category: z.enum([
    'WEDDING',
    'FUNERAL',
    'BUSINESS',
    'MUSIC',
    'LIFESTYLE_EVENTS',
    'EDUCATIONAL_EVENTS',
    'HOLIDAY_CELEBRATIONS',
    'FASHION_SHOWS',
    'HEALTH_AND_WELLNESS',
    'CULTURAL_FESTIVALS',
    'GAMING_EVENTS',
    'ENVIRONMENTAL_EVENTS',
    'TRADE_FAIR',
    'AGRICULTURAL_AND_COMMECIAL_SHOW',
    'WEB_DEVELOPMENT',
    'MARKETING',
    'TECHNOLOGY',
    'CONCERTS_AND_CHURCH',
    'CONFERENCES_AND_WORKSHOPS',
    'SPORTS_AND_FITNESS',
    'ARTS_AND_THEATER',
    'FAMILY_AND_KIDS',
    'FOOD_AND_DRINK',
    'CHARITY_AND_FUNDRAISERS',
    'COMEDY_SHOWS',
    'NETWORKING_AND_SOCIAL_GATHERINGS',
    'FILM_SCREENINGS'
  ], { message: "Invalid category" }),
  
  timeStart: z.string().min(1, { message: "Time start is required" }),
  timeEnd: z.string().min(1, { message: "Time end is required" }),
  totalSeats: z.coerce.number().int().min(1, { message: "Total seats must be at least 1" }),
  vipSeats: z.coerce.number().int().min(0, { message: "VIP seats cannot be negative" }),
  regularPrice: z.coerce.number().int().min(0, { message: "Regular price cannot be negative" }).optional(),
  vipPrice: z.coerce.number().int().min(0, { message: "VIP price cannot be negative" }).optional(),
  isFree: z.boolean().optional(),
  eventType: z.enum(['PHYSICAL', 'ONLINE'], { message: "Invalid event type" }),
});

export const updateEventSchema = eventSchema.extend({
  id: z.number().min(1, { message: "ID is required" }),
  image: imageSchema.optional(),
});
