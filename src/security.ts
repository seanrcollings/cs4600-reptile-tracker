import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "./db";

export async function encrypt(password: string) {
  return bcrypt.hash(password, 10);
}

export async function isValid(encrypted: string, plain: string) {
  return bcrypt.compare(plain, encrypted);
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

const UNPROTECED_PATHS = ["/users", "/users/login"];

export const authenticateUserFromToken: RequestHandler = async (
  req,
  res,
  next
) => {
  if (UNPROTECED_PATHS.includes(req.path)) {
    next();
    return;
  }

  const token = getTokenFromHeader(req.headers.authorization || "");

  if (!token) {
    res.status(401).json({ error: "not authenticated" });
    return;
  }

  let payload;
  try {
    payload = await verifyToken<{ userId: number }>(token);
  } catch {
    res.status(401).json({ error: "not authenticated" });
    return;
  }

  const user = await prisma.user.findFirst({ where: { id: payload.userId } });
  if (!user) {
    res.status(401).json({ error: "not authenticated" });
    return;
  } else {
    res.locals.user = user;
    next();
  }
};
