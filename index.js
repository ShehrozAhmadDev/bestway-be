import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";

import userRoutes from "./routes/user.router.js";
import adminRoutes from "./routes/admin.router.js";
import companyRoutes from "./routes/company.router.js";

import dotenv from "dotenv";
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Connect to the MongoDB database
dotenv.config();
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
mongoose.set("strictQuery", false);

const PORT = process.env.PORT || 4001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`App Connected on PORT ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

// Set up routes

app.set("Access-Control-Allow-Origin", "*");
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/company", companyRoutes);
app.get("/", function (req, res) {
  res.send("Welcome to express app");
});
