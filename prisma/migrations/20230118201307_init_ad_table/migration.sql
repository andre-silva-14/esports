-- CreateTable
CREATE TABLE "Ad" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "expertise" TEXT NOT NULL,
    "weekDays" TEXT NOT NULL,
    "hourStart" TEXT NOT NULL,
    "hourEnd" TEXT NOT NULL,
    "useVoiceChannel" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Ad_id_key" ON "Ad"("id");
