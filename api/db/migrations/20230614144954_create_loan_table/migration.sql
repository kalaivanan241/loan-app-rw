-- CreateTable
CREATE TABLE `loan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DOUBLE NOT NULL,
    `emi` DOUBLE NOT NULL,
    `months` INTEGER NOT NULL,
    `bankName` VARCHAR(191) NOT NULL,
    `processedData` DATETIME(3) NOT NULL,
    `emiDate` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
