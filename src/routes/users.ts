import { Router } from "express";
import { CreateUserRequest, LoginRequest } from "../types";
import { prisma } from "../db";
import * as security from "../security";

const router = Router();

router.post("/", async (req, res) => {
  const { firstName, lastName, email, password } =
    req.body as CreateUserRequest;

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      passwordHash: security.encrypt(password),
    },
  });

  res.json({
    user: { ...user, passwordHash: undefined },
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body as LoginRequest;
  const user = await prisma.user.findFirst({ where: { email } });

  if (user && security.isValid(user.passwordHash, password)) {
    const token = await security.createToken({ userId: user.id });
    res.json({ token });
  } else {
    res.status(400).json({ message: "invalid username or password?" });
  }
});

export default router;
