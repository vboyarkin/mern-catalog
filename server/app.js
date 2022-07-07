import path from "path";
import logger from "morgan";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.BACKEND_PORT;
const isProduction = process.env.NODE_ENV === "production";

app.use(logger("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ origin: "*", maxAge: 120, methods: "GET" }));

app.use(express.static(path.join("/home/client/build")));

app.use(routes);

mongoose.connect(process.env.MONGO_URI, {
  authSource: "admin",
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: process.env.MONGO_USERNAME,
  pass: process.env.MONGO_PASSWORD,
});

if (!isProduction) mongoose.set("debug", true);

app.use((err, req, res, next) => {
  console.error("Error in routing:\n", err);
  res.status(500).json({ error: err });
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

