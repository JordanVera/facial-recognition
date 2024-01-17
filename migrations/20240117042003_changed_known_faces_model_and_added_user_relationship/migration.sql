/*
  Warnings:

  - You are about to drop the `KnownFaces` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `KnownFaces`;

-- CreateTable
CREATE TABLE `knownFaces` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `descriptors` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `knownFaces_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `knownFaces` ADD CONSTRAINT `knownFaces_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
