import {
  CreateUserRequest,
  LoginRequest,
  UserJwtPayload,
  Endpoint,
} from "../types";
import * as security from "../lib/security";
import { body, Schemas } from "../lib/validate";
import { controller } from "../lib/controller";
import { error } from "../lib/utils";

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
      res.status(400).json(error("invalid username or password?"));
    }
  },
];

const me: Endpoint =
  ({ client }) =>
  async (req, res) => {
    const user = client.user.findFirst({ where: { id: res.locals.user.id } });

    res.json({ user: { ...user, passwordHash: undefined } });
  };

const createUser: Endpoint = ({ client }) => [
  body(Schemas.createUser),
  async (req, res) => {
    const { firstName, lastName, email, password } =
      req.body as CreateUserRequest;

    const preexistingUser = await client.user.findFirst({ where: { email } });

    if (preexistingUser) {
      res.status(400).json(error("email in use"));
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

const listUserSchedules: Endpoint =
  ({ client }) =>
  async (req, res) => {
    const schedules = await client.schedule.findMany({
      where: { userId: res.locals.user.id },
      include: { reptile: true },
    });

    res.json({ schedules });
  };

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
  {
    path: "/me",
    method: "get",
    endpoint: me,
  },
  {
    path: "/schedules",
    method: "get",
    endpoint: listUserSchedules,
  },
]);
