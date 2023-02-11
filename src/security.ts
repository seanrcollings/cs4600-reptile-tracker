import { Request, RequestHandler, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "./db";
import { User } from "@prisma/client";
import { UserJwtPayload } from "./types";

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

export async function decodeToken<T>(token: string): Promise<T> {
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

const UNPROTECED_PATHS = ["/users", "/users/login"];

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
  callback: () => string | null
) {
  if (UNPROTECED_PATHS.includes(req.path)) {
    next();
    return;
  }

  const token = callback();

  if (!token) {
    res.status(401).json({ error: "not authenticated" });
    return;
  }

  let payload: UserJwtPayload;
  try {
    payload = await decodeToken<UserJwtPayload>(token);
  } catch {
    res.status(401).json({ error: "not authenticated" });
    return;
  }

  res.locals.user = payload;
  next();
}

export const tokenAuthenticate: RequestHandler = async (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (!req.headers.authorization) return null;

    const regex = /Bearer (.+)/;

    const match = req.headers.authorization.match(regex);
    if (match) {
      return match[1];
    }
    return null;
  });
};
