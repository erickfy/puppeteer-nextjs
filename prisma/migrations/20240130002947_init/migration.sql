-- CreateEnum
CREATE TYPE "USER_ROLE" AS ENUM ('ADMIN', 'CLIENT');

-- CreateTable
CREATE TABLE "User" (
    "id" SMALLSERIAL NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "hashedPassword" VARCHAR(106) NOT NULL,
    "fullNames" VARCHAR(40),
    "image" TEXT,
    "role" "USER_ROLE" NOT NULL DEFAULT 'CLIENT',
    "active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sessions" TIMESTAMP(3)[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstagramHistory" (
    "id" SMALLSERIAL NOT NULL,
    "list" TEXT[],
    "userId" INTEGER NOT NULL,

    CONSTRAINT "InstagramHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmazonHistory" (
    "id" SMALLSERIAL NOT NULL,
    "list" TEXT[],
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AmazonHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MercadoLibreHistory" (
    "id" SMALLSERIAL NOT NULL,
    "list" TEXT[],
    "userId" INTEGER NOT NULL,

    CONSTRAINT "MercadoLibreHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookStoreHistory" (
    "id" SMALLSERIAL NOT NULL,
    "list" TEXT[],
    "userId" INTEGER NOT NULL,

    CONSTRAINT "BookStoreHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "InstagramHistory_userId_key" ON "InstagramHistory"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AmazonHistory_userId_key" ON "AmazonHistory"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MercadoLibreHistory_userId_key" ON "MercadoLibreHistory"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BookStoreHistory_userId_key" ON "BookStoreHistory"("userId");
