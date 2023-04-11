/*
  Warnings:

  - A unique constraint covering the columns `[defaultPlanId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "defaultPlanId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_defaultPlanId_key" ON "User"("defaultPlanId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_defaultPlanId_fkey" FOREIGN KEY ("defaultPlanId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
