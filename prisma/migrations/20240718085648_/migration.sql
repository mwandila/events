-- CreateTable
CREATE TABLE "NFCTag" (
    "id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastScanned" TIMESTAMP(3),
    "ticketId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NFCTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NFCCard" (
    "id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastUsed" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NFCCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NFCTag_uid_key" ON "NFCTag"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "NFCTag_ticketId_key" ON "NFCTag"("ticketId");

-- CreateIndex
CREATE INDEX "NFCTag_uid_idx" ON "NFCTag"("uid");

-- CreateIndex
CREATE INDEX "NFCTag_isActive_idx" ON "NFCTag"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "NFCCard_uid_key" ON "NFCCard"("uid");

-- CreateIndex
CREATE INDEX "NFCCard_uid_idx" ON "NFCCard"("uid");

-- CreateIndex
CREATE INDEX "NFCCard_isActive_idx" ON "NFCCard"("isActive");

-- CreateIndex
CREATE INDEX "NFCCard_userId_idx" ON "NFCCard"("userId");

-- AddForeignKey
ALTER TABLE "NFCTag" ADD CONSTRAINT "NFCTag_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFCCard" ADD CONSTRAINT "NFCCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
