import express from "express";
import dotenv from "dotenv";

import users from "./routes/users";
import reptiles from "./routes/reptiles";
import { authenticateUserFromToken } from "./security";

dotenv.config();

const app = express();

app.use(express.json());
app.use(authenticateUserFromToken);

app.use("/users", users);
app.use("/reptiles", reptiles);

app.listen(3000);
