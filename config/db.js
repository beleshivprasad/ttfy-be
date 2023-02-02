const { Sequelize, DataTypes } = require("sequelize");
const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_TYPE,
} = require("./env");
const initializeDB = require("../models/initializeDB");

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_TYPE,
  logging: false,
});

const connectDB = async () => {
  sequelize
    .authenticate()
    .then(async () => {
      console.log("Connected to Database");
      await initializeDB();
    })
    .catch((err) => {
      console.log("Database Connection Failed..");
      console.log("failed due to=>", err);
    });
};

module.exports = { connectDB, sequelize, DataTypes };
