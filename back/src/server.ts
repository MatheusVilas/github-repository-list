import dotenv from "dotenv";

// Lendo variáveis de ambiente
dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

import express from "express";
import routes from "./routes";
import bodyParser from "body-parser";
import cors from "cors";

// Init server
const app = express();

// Configs
app.use(cors());
app.use(bodyParser.json());
app.use(routes);

// Start
app.listen(process.env.PORT);
