import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserJwtPayload } from "../../types";
import { decodeToken } from "../security";

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
  callback: () => string | null
) {
  const token = callback();

  if (!token) {
    res.status(401).json({ errors: "not authenticated" });
    return;
  }

  let payload: UserJwtPayload;
  try {
    payload = await decodeToken<UserJwtPayload>(token);
  } catch {
    res.status(401).json({ errors: "not authenticated" });
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
