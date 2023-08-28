-- CreateTable
CREATE TABLE "EmailLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "month" TEXT NOT NULL,
    "sent" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailLog_month_key" ON "EmailLog"("month");
