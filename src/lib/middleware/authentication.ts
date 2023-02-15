import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserJwtPayload } from "../../types";
import { decodeToken } from "../security";

const UNPROTECED_PATHS = ["/users", "/users/login"];

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
  callback: () => string | null
) {
  // if (UNPROTECED_PATHS.includes(req.path)) {
  //   next();
  //   return;
  // }

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
