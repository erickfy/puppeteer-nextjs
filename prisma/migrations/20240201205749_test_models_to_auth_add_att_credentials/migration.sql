/*
  Warnings:

  - Added the required column `password` to the `TestUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `TestUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestUser" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;
