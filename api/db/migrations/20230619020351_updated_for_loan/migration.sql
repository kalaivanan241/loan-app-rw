-- AlterTable
ALTER TABLE `loan` ALTER COLUMN `interestRate` DROP DEFAULT,
    ALTER COLUMN `outstandingInstallmentAmount` DROP DEFAULT,
    ALTER COLUMN `outstandingInstallments` DROP DEFAULT;
