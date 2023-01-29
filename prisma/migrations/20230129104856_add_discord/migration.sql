/*
  Warnings:

  - You are about to alter the column `gameId` on the `Ad` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - Added the required column `discord` to the `Ad` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ad" (
    "id" TEXT NOT NULL,
    "gameId" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "expertise" TEXT NOT NULL,
    "discord" TEXT NOT NULL,
    "weekDays" TEXT,
    "hourStart" TEXT,
    "hourEnd" TEXT,
    "useVoiceChannel" BOOLEAN,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Ad" ("createdAt", "expertise", "gameId", "hourEnd", "hourStart", "id", "name", "useVoiceChannel", "weekDays") SELECT "createdAt", "expertise", "gameId", "hourEnd", "hourStart", "id", "name", "useVoiceChannel", "weekDays" FROM "Ad";
DROP TABLE "Ad";
ALTER TABLE "new_Ad" RENAME TO "Ad";
CREATE UNIQUE INDEX "Ad_id_key" ON "Ad"("id");
CREATE INDEX "Ad_gameId_idx" ON "Ad"("gameId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
