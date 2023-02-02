require("dotenv").config({ path: "../.env" });

const env = {
  // APP ENVIORNMENT VARIABLES
  APP_PORT: process.env.APP_PORT,
  APP_HOST: process.env.APP_HOST,
  APP_PROTOCOL: process.env.APP_PROTOCOL,
  // JWT ENVIORNMENT VARIABLES
  JWT_SECRET: process.env.JWT_SECRET,
  // DATABASE ENV VARIABLES
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_TYPE: process.env.DB_TYPE,
};

module.exports = env;
