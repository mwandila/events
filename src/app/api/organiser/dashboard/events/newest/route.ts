import { db } from "@/lib/prisma"
import { cache } from "@/utils/cache"
  
  const getNewestevents = cache(() => {
    return db.event.findMany({
      where: { isAvailable: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    })
  }, ["/", "getNewestProducts"])