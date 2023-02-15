import {
  CreateUserRequest,
  LoginRequest,
  UserJwtPayload,
  Endpoint,
} from "../types";
import * as security from "../lib/security";
import { body, Schemas } from "../lib/validate";
import { controller } from "../lib/controller";

const login: Endpoint = ({ client }) => [
  body(Schemas.loginUser),
  async (req, res) => {
    const { email, password } = req.body as LoginRequest;
    const user = await client.user.findFirst({ where: { email } });

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
  },
];

const createUser: Endpoint = ({ client }) => [
  body(Schemas.createUser),
  async (req, res) => {
    const { firstName, lastName, email, password } =
      req.body as CreateUserRequest;

    const preexistingUser = await client.user.findFirst({ where: { email } });

    if (preexistingUser) {
      res.status(400).json({ error: "email in use" });
    }

    const user = await client.user.create({
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
  },
];

export const usersController = controller("users", [
  {
    path: "",
    method: "post",
    endpoint: createUser,
    skipAuth: true,
  },
  {
    path: "/login",
    method: "post",
    endpoint: login,
    skipAuth: true,
  },
]);
