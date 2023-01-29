/*
  Warnings:

  - Added the required column `gameId` to the `Ad` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ad" (
    "id" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "expertise" TEXT NOT NULL,
    "weekDays" TEXT NOT NULL,
    "hourStart" TEXT NOT NULL,
    "hourEnd" TEXT NOT NULL,
    "useVoiceChannel" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Ad" ("createdAt", "expertise", "hourEnd", "hourStart", "id", "name", "useVoiceChannel", "weekDays") SELECT "createdAt", "expertise", "hourEnd", "hourStart", "id", "name", "useVoiceChannel", "weekDays" FROM "Ad";
DROP TABLE "Ad";
ALTER TABLE "new_Ad" RENAME TO "Ad";
CREATE UNIQUE INDEX "Ad_id_key" ON "Ad"("id");
CREATE INDEX "Ad_gameId_idx" ON "Ad"("gameId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
