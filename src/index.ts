import express from "express";
import dotenv from "dotenv";

import users from "./routes/users";
import reptiles from "./routes/reptiles";
import feedings from "./routes/feedings";
import { authenticateUserFromToken } from "./security";
import { clientErrorHandler, errorHandler, logErrors } from "./errors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(authenticateUserFromToken);

app.use("/users", users);
app.use("/reptiles", reptiles);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

app.listen(3000);
