-- AlterTable
ALTER TABLE `loan` ADD COLUMN `interestRate` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `outStandingInstallmentAmount` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `outStandingInstallments` INTEGER NOT NULL DEFAULT 0;
