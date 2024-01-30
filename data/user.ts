import { db } from "@/lib/db";

export const getUserByUsername = async (username: string) => {
  try {
    const user = await db.user.findUnique({
      where: { username: username, active: true },
      select: {
        id: true,
        image: true,
        hashedPassword: true,
        username: true,
        role: true,
      }
    });
    console.log("exists this user", user)

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};
