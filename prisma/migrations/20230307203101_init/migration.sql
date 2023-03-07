-- CreateTable
CREATE TABLE `Ad` (
    `id` VARCHAR(191) NOT NULL,
    `gameId` BIGINT NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `expertise` VARCHAR(191) NOT NULL,
    `discord` VARCHAR(191) NOT NULL,
    `weekDays` VARCHAR(191) NULL,
    `hourStart` VARCHAR(191) NULL,
    `hourEnd` VARCHAR(191) NULL,
    `useVoiceChannel` BOOLEAN NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Ad_id_key`(`id`),
    INDEX `Ad_gameId_idx`(`gameId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
