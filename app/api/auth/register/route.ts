import { NextResponse } from "next/server";
import { USER_ROLE } from "@prisma/client";
import { hashedPassword } from "@/lib/hashPassword";
import { db } from "@/lib/db";
import { generateId } from "lucia";

export async function POST(
  request: Request,
) {
  try {
    const body = await request.json();
    const {
      username,
      password,
      role,
    }: { username: string, password: string, role: USER_ROLE } = body;

    const hash = await hashedPassword(password);
    const id = generateId(15)

    const user = await db.user.create({
      data: {
        id,
        username,
        hashedPassword: hash,
        role,
        active: true,
      }
    });

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.error();
  }
}