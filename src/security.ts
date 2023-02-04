import crypto from "crypto";
import jwt from "jsonwebtoken";

export function encrypt(password: string) {
  return crypto
    .pbkdf2Sync(password, process.env.SALT as string, 100000, 64, "sha512")
    .toString();
}

export function isValid(encrypted: string, plain: string) {
  return encrypted === encrypt(plain);
}

export async function createToken<T extends object | string | Buffer>(
  payload: T
) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET as string,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
}

export async function verifyToken<T>(token: string): Promise<T> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET as string, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res as T);
      }
    });
  });
}

export function getTokenFromHeader(headerValue: string) {
  const regex = /Bearer (.+)/;

  const match = headerValue.match(regex);
  if (match) {
    return match[1];
  }
  return null;
}
