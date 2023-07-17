const { PORT = 5000, NODE_ENV } = process.env;
import mongoose from "mongoose";
import app from "./app";
import { DatabaseConfig } from "./db/DatabaseConfig";

mongoose
  .connect(DatabaseConfig.getDatabaseUri(NODE_ENV))
  .then(() => {
    console.log("DB connection is successful🚀");
  })
  .catch((error) => {
    console.log("💣😑 What Happened");
    console.error(error);
  });

app.listen(PORT, listener);
function listener() {
  console.log(`🚀Listening on Port ${PORT}🚀`);
}
