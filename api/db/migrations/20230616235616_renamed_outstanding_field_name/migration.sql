/*
  Warnings:

  - You are about to drop the column `outStandingInstallmentAmount` on the `loan` table. All the data in the column will be lost.
  - You are about to drop the column `outStandingInstallments` on the `loan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `loan` DROP COLUMN `outStandingInstallmentAmount`,
    DROP COLUMN `outStandingInstallments`,
    ADD COLUMN `outstandingInstallmentAmount` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `outstandingInstallments` INTEGER NOT NULL DEFAULT 0;
