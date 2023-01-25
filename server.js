const express = require("express");
const dotenv = require("dotenv").config({ path: ".env" });

// Create App Instance
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "ping success", success: true }).status(200);
});

// Listening App
app.listen(() => {
  console.log(
    `server running on ${process.env.APP_PROTOCOL}://${process.env.APP_HOST}:${process.env.APP_PORT}`
  );
});
