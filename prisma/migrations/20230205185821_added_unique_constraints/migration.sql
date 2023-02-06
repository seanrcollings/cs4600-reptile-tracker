/*
  Warnings:

  - A unique constraint covering the columns `[id,reptileId]` on the table `Feeding` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,reptileId]` on the table `HusbandryRecord` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,userId]` on the table `Reptile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,reptileId,userId]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Feeding_id_reptileId_key" ON "Feeding"("id", "reptileId");

-- CreateIndex
CREATE UNIQUE INDEX "HusbandryRecord_id_reptileId_key" ON "HusbandryRecord"("id", "reptileId");

-- CreateIndex
CREATE UNIQUE INDEX "Reptile_id_userId_key" ON "Reptile"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_id_reptileId_userId_key" ON "Schedule"("id", "reptileId", "userId");
