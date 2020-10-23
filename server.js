// import express from "express";
const express = require('express');
// import dotenv from "dotenv";
require('dotenv').config();
// import connectDB from "./db/postgres.js";

// import userRoutes from "./routes/userRoute.js";

// dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Working Perfect");
});

require("./db/postgres")

// app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 2020;
app.listen(
  PORT,
  console.log(`Up And Running on PORT ${PORT}`)
);
