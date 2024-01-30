import { PrismaClient } from "@prisma/client";
/**
 * ? In development not create many times instances of PrismaClient
 */
declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;