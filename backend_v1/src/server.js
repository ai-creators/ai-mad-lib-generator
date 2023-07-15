const { PORT = 5000, NODE_ENV } = process.env;
import DatabaseConfig from "./db/DatabaseConfig";
import app from "./app";
import DatabaseManager from "./db/DatabaseManager";

DatabaseManager.connect(DatabaseConfig.getDatabaseUri(NODE_ENV))
  .then((ans) => {
    console.log("DB connection is successful 🚀");
    app.listen(PORT, listener);
  })
  .catch((error) => {
    console.log("💣😑 What Happened");
    console.error(error);
  });

function listener() {
  console.log(`Listening on Port ${PORT}!`);
}
