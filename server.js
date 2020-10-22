import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/postgres.js";

import userRoutes from "./routes/userRoute.js";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Working Perfect");
});

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 2020;
app.listen(
  PORT,
  console.log(`Up And Running on PORT ${PORT}`)
);
