import { getServerSession } from "next-auth/next"

import { db } from "@/lib/db";
import { authOptions } from "@/lib/authOptions";

export async function getSession() {
  const res = await getServerSession(authOptions)
  console.log("well", res)
  return res;
}

export enum COMPLETE_USER {
  ALL = 'ALL',
  LESS = 'LESS',
  FULLNAMES = 'FULLNAMES',
  PRIVILEGES = 'PRIVILEGES',
}

export default function getCurrentUser() {

  async function userLess() {
    try {

      const username = await getUsername()
      if (!username) return null

      const user = await db.user.findUnique({
        where: {
          username,
          active: true,
        },
        select: {
          id: true,
          fullNames: true,
          role: true,
        }
      });
      if (!user) {
        return null;
      }
      return user
    } catch (e) {
      new Error("Invalidate userLess")
    }
  }

  async function userPrivileges() {
    try {

      const username = await getUsername()
      // console.log("is", username)
      if (!username) return null

      const user = await db.user.findUnique({
        where: {
          username,
          active: true,
        },
        select: {
          id: true,
          role: true,
          image: true,
          username: true,
          fullNames: true,
        }
      });
      if (!user) {
        return null;
      }
      return user
    } catch (e) {
      new Error("Invalidate userLess")
    }
  }

  async function userFullNames() {
    try {

      const username = await getUsername()
      if (!username) return null

      const user = await db.user.findUnique({
        where: {
          username,
          active: true,
        },
        select: {
          id: true,
          fullNames: true,
        }
      });
      if (!user) {
        return null;
      }
      return user
    } catch (e) {
      new Error("Invalidate userLess")
    }
  }

  async function userAll() {
    try {

      const username = await getUsername()
      if (!username) return null

      const user = await db.user.findUnique({
        where: {
          username,
          active: true
        },
      });
      if (!user) {
        return null;
      }
      return user
    } catch (e) {
      new Error("Invalidate userLess")
    }
  }

  return { userFullNames, userLess, userPrivileges, userAll }

}


async function getUsername() {
  const session = await getSession();

  if (!session?.user?.name) return null

  const { image, name: username, } = session.user
  return username
}

