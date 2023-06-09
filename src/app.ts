import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import todosRouter from "./routes/todosRouter";
import usersRouter from "./routes/usersRouter";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const PORT: string | number = process.env.PORT || 4000;

app.use(bodyParser.json({ limit: "31mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
app.use(usersRouter);
app.use(todosRouter);

const uri = `${process.env.MONGO_DB}`;

mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => {
    throw error;
  });
