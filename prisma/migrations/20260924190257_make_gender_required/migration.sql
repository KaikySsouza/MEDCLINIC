/*
  Warnings:

  - Made the column `gender` on table `Patients` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Patients" ALTER COLUMN "gender" SET NOT NULL;
