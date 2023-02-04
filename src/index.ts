import express from "express";
import dotenv from "dotenv";

import users from "./routes/users";
import { prisma } from "./db";
import { getTokenFromHeader, verifyToken } from "./security";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/users", users);

const UNPROTECED_PATHS = ["/users", "/users/login"];

app.use(async (req, res, next) => {
  if (UNPROTECED_PATHS.includes(req.path)) {
    next();
    return;
  }

  const token = getTokenFromHeader(req.headers.authorization || "");

  if (!token) {
    res.status(401).json({ message: "not authenticated" });
    return;
  }

  let payload;
  try {
    payload = await verifyToken<{ userId: number }>(token);
  } catch {
    res.status(401).json({ message: "invalid token. may have expired" });
    return;
  }

  const user = await prisma.user.findFirst({ where: { id: payload.userId } });
  if (!user) {
    res.status(401).json({
      message: "The user associated with this token no longer exists",
    });
  } else {
    res.locals.user = user;
    next();
  }
});

app.listen(3000);
