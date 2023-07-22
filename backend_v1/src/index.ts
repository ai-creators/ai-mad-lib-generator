import path from "path";
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const { PORT = 5000, NODE_ENV } = process.env;
import mongoose from "mongoose";
import App from "./App";
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

const app = App.getInstance();
app.init();
app.getExpressApp().listen(PORT, listener);
function listener() {
  console.log(`🚀Listening on Port ${PORT}🚀`);
  console.log("STARTING UPPP BOI");
}
