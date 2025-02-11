-- CreateTable
CREATE TABLE "short" (
    "id" SERIAL NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "longUrl" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "short_shortUrl_key" ON "short"("shortUrl");
