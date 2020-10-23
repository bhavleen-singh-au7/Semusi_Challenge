const express = require("express");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send("Working Perfect");
});

require("./db/postgres");

const userRoutes = require("./routes/userRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 2020;
app.listen(
  PORT,
  console.log(`Up And Running on PORT ${PORT}`)
);
