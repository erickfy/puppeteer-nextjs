import argon2, { argon2i } from "argon2";
import { SECRET_HASH } from "./constants";

/**
 * argon is to encryp the passwords and customize a current secret based in a random string (SECRET_HASH)
 *? DOCS: https://www.npmjs.com/package/argon2
 */

const secret = Buffer.from(SECRET_HASH, 'utf8');

export const optionsArgon2: argon2.Options & { raw?: false | undefined } = {
  timeCost: 2,
  memoryCost: 4192,
  saltLength: 16,
  hashLength: 32,
  secret: secret,
  raw: false,
  type: argon2i
}

export async function hashedPassword(password: string) {
  const hash = await argon2.hash(password, optionsArgon2);
  return hash
}


export async function verifyHash(hash: string, password: string) {
  const isVerify = await argon2.verify(
    hash,
    password,
    optionsArgon2
  );
  return isVerify
}
