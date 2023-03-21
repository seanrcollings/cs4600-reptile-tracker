import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import { clientErrorHandler, errorHandler, logErrors } from "./errors";
import { UserJwtPayload } from "./types";

import {
  usersController,
  feedingsController,
  husbandryRecordsController,
  reptilesController,
  schedulesController,
} from "./controllers";

declare global {
  namespace Express {
    export interface Locals {
      user: UserJwtPayload;
    }
  }
}

dotenv.config();

const app = express();
const client = new PrismaClient();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*" }));

usersController(app, { client });
reptilesController(app, { client });
feedingsController(app, { client });
schedulesController(app, { client });
husbandryRecordsController(app, { client });

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

app.listen(3000);
