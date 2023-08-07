import path from "path";
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

export class DatabaseConfig {
  public static getDatabaseUri(NODE_ENV: string | undefined): string {
    if (!NODE_ENV) {
      throw new Error(`No enviroment has been found`);
    }
    const databaseType =
      NODE_ENV === "test" ? "DATABASE_URL_TEST" : "DATABASE_URL";
    const databaseUri: string | undefined = process.env[databaseType];
    if (!databaseUri) {
      throw new Error(
        `No Database Url can be found from enviroment: "${NODE_ENV}"`
      );
    }
    return databaseUri ?? "";
  }
}
