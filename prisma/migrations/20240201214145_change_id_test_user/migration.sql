/*
  Warnings:

  - The primary key for the `TestUser` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "TestUser" DROP CONSTRAINT "TestUser_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TestUser_pkey" PRIMARY KEY ("id");
