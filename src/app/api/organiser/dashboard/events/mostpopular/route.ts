import { db } from "@/lib/prisma"
import { cache } from "@/utils/cache"
const getMostPopularevents = cache(
    () => {
      return db.event.findMany({
        where: { isAvailable: true },
        orderBy: { orders: { _count: "desc" } },
        take: 6,
      })
    },
    ["/", "getMostPopularevents"],
    { revalidate: 60 * 60 * 24 }
  )