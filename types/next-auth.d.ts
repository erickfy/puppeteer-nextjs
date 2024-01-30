// import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";
// import { JWT } from "next-auth/jwt";

// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//     } & DefaultSession["user"];
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     userId: string;
//   } 
// }

import { USER_ROLE } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    role: USER_ROLE;
    // isTwoFactorEnabled: boolean;
    // isOAuth: boolean;
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}
