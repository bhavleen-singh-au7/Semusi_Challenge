const express = require("express");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.render("Working Perfect");
});

// Database
require("./db/postgres");

// My routes
const userRoutes = require("./routes/user");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// My routes -> Middlewares
app.use(userRoutes);

// Starting a server
const PORT = process.env.PORT || 2020;
app.listen(
  PORT,
  console.log(`Up And Running on PORT ${PORT}`)
);
