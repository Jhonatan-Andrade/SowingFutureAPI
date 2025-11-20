-- AlterTable
ALTER TABLE "accountingRecords" ALTER COLUMN "value" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "goals" ALTER COLUMN "targetValue" SET DATA TYPE TEXT,
ALTER COLUMN "currentValue" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "value" SET DATA TYPE TEXT;
