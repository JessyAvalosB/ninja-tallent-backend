import cors from "cors";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";

import express, { Application } from "express";
``;
import Logger from "./lib/logger";
import userRoutes from "./routes/user.route";
import morganMiddleware from "./config/morganMiddleware";

const app: Application = express();

// env config
dotenv.config();

// App config
app.use(morganMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.URL_CORS_ORIGIN }));

// Routes
app.use("/users", userRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  Logger.info(`Server is running on PORT http://localhost:${PORT}`);
});
