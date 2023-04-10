const mongoose = require("mongoose");
require("dotenv").config();

function getDatabaseUri() {
  if (process.env.NODE_ENV === "production") {
    return process.env.DATABASE_URL || "";
  } else if (process.env.NODE_ENV === "test") {
    return process.env.DATABASE_URL_TEST || "";
  } else {
    return process.env.DATABASE_URL_DEVELOPMENT || "";
  }
}

function initDatabaseConfig() {
  mongoose.connect(this.getDatabaseUri());
  const db = mongoose.connection;
  db.on("error", (error) => {
    console.error(error);
  });

  db.once("connected", () => {
    console.log("Database Connected");
  });
}

module.exports = { initDatabaseConfig, getDatabaseUri };
