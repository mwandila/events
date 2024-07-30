import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { db } from "@/lib/prisma"
  import { formatCurrency,formatDate, formatNumber } from "@/utils/formatters"
  import { OrdersByDayChart } from "../charts/charts/OrdersByDayChart"
  import { Prisma } from "@prisma/client"
  import {
    differenceInDays,
    differenceInMonths,
    differenceInWeeks,
    eachDayOfInterval,
    eachMonthOfInterval,
    eachWeekOfInterval,
    eachYearOfInterval,
    endOfWeek,
    interval,
    max,
    min,
    startOfDay,
    startOfWeek,
    subDays,
  } from "date-fns"
  import { Search } from "lucide-react"
  import { ReactNode } from "react"
  import { UsersByDayChart } from "../charts/charts/UsersByDayChart" 
  import { RevenueByEventChart } from "../charts/charts/RevenueByeventChart"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Button } from "@/components/ui/button"
  import { RANGE_OPTIONS,getRangeOption  } from "@/utils/rangeOptions"
  import { ChartCard } from "./ChartCard" 
  
  async function getSalesData(
    createdAfter: Date | null,
    createdBefore: Date | null
  ) {
    const createdAtQuery: Prisma.OrderWhereInput["createdAt"] = {}
    if (createdAfter) createdAtQuery.gte = createdAfter
    if (createdBefore) createdAtQuery.lte = createdBefore
  
    const [data, chartData] = await Promise.all([
      db.order.aggregate({
        _sum: { pricePaid: true },
        _count: true,
      }),
      db.order.findMany({
        select: { createdAt: true, pricePaid: true },
        where: { createdAt: createdAtQuery },
        orderBy: { createdAt: "asc" },
      }),
    ])
  
    const { array, format } = getChartDateArray(
      createdAfter || startOfDay(chartData[0].createdAt),
      createdBefore || new Date()
    )
  
    const dayArray = array.map(date => {
      return {
        date: format(date),
        totalSales: 0,
      }
    })
  
    return {
      chartData: chartData.reduce((data, order) => {
        const formattedDate = format(order.createdAt)
        const entry = dayArray.find(day => day.date === formattedDate)
        if (entry == null) return data
        entry.totalSales += order.pricePaid / 100
        return data
      }, dayArray),
      amount: (data._sum.pricePaid || 0) / 100,
      numberOfSales: data._count,
    }
  }
  
  async function getUserData(
    createdAfter: Date | null,
    createdBefore: Date | null
  ) {
    const createdAtQuery: Prisma.UserWhereInput["createdAt"] = {}
    if (createdAfter) createdAtQuery.gte = createdAfter
    if (createdBefore) createdAtQuery.lte = createdBefore
  
    const [userCount, orderData, chartData] = await Promise.all([
      db.user.count(),
      db.order.aggregate({
        _sum: { pricePaid: true },
      }),
      db.user.findMany({
        select: { createdAt: true },
        where: { createdAt: createdAtQuery },
        orderBy: { createdAt: "asc" },
      }),
    ])
  
    const { array, format } = getChartDateArray(
      createdAfter || startOfDay(chartData[0].createdAt),
      createdBefore || new Date()
    )
  
    const dayArray = array.map(date => {
      return {
        date: format(date),
        totalUsers: 0,
      }
    })
  
    return {
      chartData: chartData.reduce((data, user) => {
        const formattedDate = format(user.createdAt)
        const entry = dayArray.find(day => day.date === formattedDate)
        if (entry == null) return data
        entry.totalUsers += 1
        return data
      }, dayArray),
      userCount,
      averageValuePerUser:
        userCount === 0
          ? 0
          : (orderData._sum.pricePaid || 0) / userCount / 100,
    }
  }
  
  async function getEvenData(
    createdAfter: Date | null,
    createdBefore: Date | null
  ) {
    const createdAtQuery: Prisma.OrderWhereInput["createdAt"] = {}
    if (createdAfter) createdAtQuery.gte = createdAfter
    if (createdBefore) createdAtQuery.lte = createdBefore
  
    const [activeCount, inactiveCount, chartData] = await Promise.all([
      db.event.count({ where: { isAvailable: true } }),
      db.event.count({ where: { isAvailable: false } }),
      db.event.findMany({
        select: {
          title: true,
          orders: {
            select: { pricePaid: true },
            where: { createdAt: createdAtQuery },
          },
        },
      }),
    ])
  
    return {
      chartData: chartData
        .map(event=> {
          return {
            name: event.title,
            revenue: event.orders.reduce((sum, order) => {
              return sum + order.pricePaid / 100
            }, 0),
          }
        })
        .filter(event=> event.revenue > 0),
      activeCount,
      inactiveCount,
    }
  }
  
  export default async function AdminDashboard({
    searchParams: {
      totalSalesRange,
      totalSalesRangeFrom,
      totalSalesRangeTo,
      newCustomersRange,
      newCustomersRangeFrom,
      newCustomersRangeTo,
      revenueByeventRange,
      revenueByeventRangeFrom,
      revenueByeventRangeTo,
    },
  }: {
    searchParams: {
      totalSalesRange?: string
      totalSalesRangeFrom?: string
      totalSalesRangeTo?: string
      newCustomersRange?: string
      newCustomersRangeFrom?: string
      newCustomersRangeTo?: string
      revenueByeventRange?: string
      revenueByeventRangeFrom?: string
      revenueByeventRangeTo?: string
    }
  }) {
    const totalSalesRangeOption =
      getRangeOption(totalSalesRange, totalSalesRangeFrom, totalSalesRangeTo) ||
      RANGE_OPTIONS.last_7_days
    const newCustomersRangeOption =
      getRangeOption(
        newCustomersRange,
        newCustomersRangeFrom,
        newCustomersRangeTo
      ) || RANGE_OPTIONS.last_7_days
    const revenueByeventRangeOption =
      getRangeOption(
        revenueByeventRange,
        revenueByeventRangeFrom,
        revenueByeventRangeTo
      ) || RANGE_OPTIONS.all_time
  
    const [salesData, userData, eventData] = await Promise.all([
      getSalesData(
        totalSalesRangeOption.startDate,
        totalSalesRangeOption.endDate
      ),
      getUserData(
        newCustomersRangeOption.startDate,
        newCustomersRangeOption.endDate
      ),
      getEventData(
        revenueByeventRangeOption.startDate,
        revenueByeventRangeOption.endDate
      ),
    ])
  
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DashboardCard
            title="Sales"
            subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
            body={formatCurrency(salesData.amount)}
          />
          <DashboardCard
            title="Customers"
            subtitle={`${formatCurrency(
              userData.averageValuePerUser
            )} Average Value`}
            body={formatNumber(userData.userCount)}
          />
          <DashboardCard
            title="Active events"
            subtitle={`${formatNumber(eventData.inactiveCount)} Inactive`}
            body={formatNumber(eventData.activeCount)}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
          <ChartCard
            title="Total Sales"
            queryKey="totalSalesRange"
            selectedRangeLabel={totalSalesRangeOption.label}
          >
            <OrdersByDayChart data={salesData.chartData} />
          </ChartCard>
          <ChartCard
            title="New Customers"
            queryKey="newCustomersRange"
            selectedRangeLabel={newCustomersRangeOption.label}
          >
            <UsersByDayChart data={userData.chartData} />
          </ChartCard>
          <ChartCard
            title="Revenue By event"
            queryKey="revenueByeventRange"
            selectedRangeLabel={revenueByeventRangeOption.label}
          >
            <RevenueByEventChart data={eventData.chartData} />
          </ChartCard>
        </div>
      </>
    )
  }
  
  type DashboardCardProps = {
    title: string
    subtitle: string
    body: string
  }
  
  function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{body}</p>
        </CardContent>
      </Card>
    )
  }
  
  function getChartDateArray(startDate: Date, endDate: Date = new Date()) {
    const days = differenceInDays(endDate, startDate)
    if (days < 30) {
      return {
        array: eachDayOfInterval(interval(startDate, endDate)),
        format: formatDate,
      }
    }
  
    const weeks = differenceInWeeks(endDate, startDate)
    if (weeks < 30) {
      return {
        array: eachWeekOfInterval(interval(startDate, endDate)),
        format: (date: Date) => {
          const start = max([startOfWeek(date), startDate])
          const end = min([endOfWeek(date), endDate])
  
          return `${formatDate(start)} - ${formatDate(end)}`
        },
      }
    }
  
    const months = differenceInMonths(endDate, startDate)
    if (months < 30) {
      return {
        array: eachMonthOfInterval(interval(startDate, endDate)),
        format: new Intl.DateTimeFormat("en", { month: "long", year: "numeric" })
          .format,
      }
    }
  
    return {
      array: eachYearOfInterval(interval(startDate, endDate)),
      format: new Intl.DateTimeFormat("en", { year: "numeric" }).format,
    }
  }
  