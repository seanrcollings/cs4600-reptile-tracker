import express from "express";
import dotenv from "dotenv";

import users from "./routes/users";
import reptiles from "./routes/reptiles";
import { tokenAuthenticate } from "./security";
import { clientErrorHandler, errorHandler, logErrors } from "./errors";
import cookieParser from "cookie-parser";
import { UserJwtPayload } from "./types";

dotenv.config();

declare global {
  namespace Express {
    export interface Locals {
      user: UserJwtPayload;
    }
  }
}

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(tokenAuthenticate);

app.use("/users", users);
app.use("/reptiles", reptiles);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

app.listen(3000);
