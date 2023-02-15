import { Request, RequestHandler, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
