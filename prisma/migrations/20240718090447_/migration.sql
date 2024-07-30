-- AlterEnum
ALTER TYPE "TransactionType" ADD VALUE 'PRODUCT_SALE';

-- CreateTable
CREATE TABLE "ProductAnalytics" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "unitsSold" INTEGER NOT NULL,
    "revenue" DOUBLE PRECISION NOT NULL,
    "costs" DOUBLE PRECISION NOT NULL,
    "profit" DOUBLE PRECISION NOT NULL,
    "views" INTEGER NOT NULL,
    "addToCartCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductAdvancedAnalytics" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "conversionRate" DOUBLE PRECISION NOT NULL,
    "averageOrderValue" DOUBLE PRECISION NOT NULL,
    "customerAcquisitionCost" DOUBLE PRECISION NOT NULL,
    "customerLifetimeValue" DOUBLE PRECISION NOT NULL,
    "returnRate" DOUBLE PRECISION NOT NULL,
    "netPromoterScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductAdvancedAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductTransaction" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "type" "TransactionType" NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductAnalytics_date_idx" ON "ProductAnalytics"("date");

-- CreateIndex
CREATE INDEX "ProductAnalytics_productId_idx" ON "ProductAnalytics"("productId");

-- CreateIndex
CREATE INDEX "ProductAdvancedAnalytics_date_idx" ON "ProductAdvancedAnalytics"("date");

-- CreateIndex
CREATE INDEX "ProductAdvancedAnalytics_productId_idx" ON "ProductAdvancedAnalytics"("productId");

-- CreateIndex
CREATE INDEX "ProductTransaction_productId_idx" ON "ProductTransaction"("productId");

-- CreateIndex
CREATE INDEX "ProductTransaction_userId_idx" ON "ProductTransaction"("userId");

-- CreateIndex
CREATE INDEX "ProductTransaction_type_idx" ON "ProductTransaction"("type");

-- AddForeignKey
ALTER TABLE "ProductAnalytics" ADD CONSTRAINT "ProductAnalytics_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAdvancedAnalytics" ADD CONSTRAINT "ProductAdvancedAnalytics_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTransaction" ADD CONSTRAINT "ProductTransaction_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTransaction" ADD CONSTRAINT "ProductTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
