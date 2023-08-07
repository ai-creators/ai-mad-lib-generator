import path from "path";
require("dotenv").config({ path: path.join(__dirname, "../../", ".env") });
const { PORT = 5000, NODE_ENV } = process.env;
import mongoose from "mongoose";
import { DatabaseConfig } from "./db/DatabaseConfig";
import app from "./app";
console.log("INDEX NoDE ENV: ", NODE_ENV);
mongoose
  .connect(DatabaseConfig.getDatabaseUri(NODE_ENV))
  .then(() => {
    console.log("DB connection is successful🚀");
  })
  .catch((error) => {
    console.log("💣😑 What Happened");
    console.error(error);
  });

app.init();
app.getExpressApp().listen(PORT, listener);
function listener() {
  console.log(`🚀Listening on Port ${PORT}🚀`);
  console.log("STARTING UPPP BOI");
}
