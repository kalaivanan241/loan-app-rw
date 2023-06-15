-- AlterTable
ALTER TABLE `loan` ADD COLUMN `currency` ENUM('HKD', 'INR') NOT NULL DEFAULT 'HKD';

-- CreateTable
CREATE TABLE `debt` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DOUBLE NOT NULL,
    `to` VARCHAR(191) NOT NULL,
    `currency` ENUM('HKD', 'INR') NOT NULL DEFAULT 'INR',
    `date` DATETIME(3) NOT NULL,
    `interestRate` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
