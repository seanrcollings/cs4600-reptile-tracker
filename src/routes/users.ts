import { Router } from "express";
import { CreateUserRequest, LoginRequest, UserJwtPayload } from "../types";
import { prisma } from "../db";
import * as security from "../security";
import { body, Schemas } from "../validate";

const router = Router();

router.post("/", body(Schemas.createUser), async (req, res) => {
  const { firstName, lastName, email, password } =
    req.body as CreateUserRequest;

  const preexistingUser = await prisma.user.findFirst({ where: { email } });

  if (preexistingUser) {
    res.status(400).json({ error: "email in use" });
  }

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      passwordHash: await security.encrypt(password),
    },
  });

  res.json({
    user: { ...user, passwordHash: undefined },
  });
});

router.post("/login", body(Schemas.loginUser), async (req, res) => {
  const { email, password } = req.body as LoginRequest;
  const user = await prisma.user.findFirst({ where: { email } });

  if (user && (await security.isValid(user.passwordHash, password))) {
    const token = await security.createToken<UserJwtPayload>({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
    res.json({ token });
  } else {
    res.status(400).json({ error: "invalid username or password?" });
  }
});

export default router;
