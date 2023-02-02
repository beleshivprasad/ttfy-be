const express = require("express");
const dotenv = require("dotenv").config({ path: ".env" });
const { connectDB } = require("./config/db");
const { APP_PORT, APP_HOST, APP_PROTOCOL } = require("./config/env");
const cors = require("cors");

// Create App Instance
const app = express();

// Cors
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

//Import Routers
const userRouter = require("./routers/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);

// Listening App
app.listen(APP_PORT, async () => {
  console.log(`server running on ${APP_PROTOCOL}://${APP_HOST}:${APP_PORT}`);
  // Connect to Database
  await connectDB();
});
