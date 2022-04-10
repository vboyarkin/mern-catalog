import path from "path";
import logger from "morgan";
import DBG from "debug";
const log = DBG("catalog:service");
const error = DBG("catalog:error");
console.log = log;
console.error = error;

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
const PORT = process.env.BACKEND_PORT;
const isProduction = process.env.NODE_ENV === "production";

app.use(logger("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ origin: "*", maxAge: 120, methods: "GET" }));

app.use(express.static(path.join("/home/client/build")));

app.use(routes);

mongoose.connect(process.env.MONGO_URI + "?authSource=admin&w=1");

import Item from "./models/item.js";

import routes from "./routes/index.js";

if (!isProduction) mongoose.set("debug", true);

app.use((err, req, res, next) => {
  console.error("Error in routing:\n", err);
  res.status(422).json({ error: err });
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

