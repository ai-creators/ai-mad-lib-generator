import mongoose, { Error, Model, Mongoose } from "mongoose";
import { DatabaseConfig } from "./DatabaseConfig";
import { ErrroHandler } from "../errors/ErrorHandler";

export class DatabaseManager {
  public static connect(dbUri: string): Promise<Mongoose> {
    if (!dbUri) {
      throw new Error(`Database uri provided: "${dbUri}" is no a valid uri`);
    }
    return mongoose.connect(dbUri).then((res) => {
      console.log("CONNECXTED TO THE DB");
      return res;
    });
  }

  public static disconnect(): Promise<void> {
    return mongoose.connection.close();
  }

  public static async seed<T>(
    model: Model<T>,
    data: T,
    showLog: boolean = false
  ): Promise<void> {
    try {
      await model.create(data);
      if (showLog) {
        console.log("Data successfully injected!");
      }
    } catch (e: unknown) {
      throw ErrroHandler.ensureError(e);
    }
  }

  public static async reap<T>(
    model: Model<T>,
    showLog: boolean = false
  ): Promise<void> {
    try {
      await model.deleteMany();
      if (showLog) {
        console.log("Data successfully deleted!");
      }
    } catch (e: unknown) {
      throw ErrroHandler.ensureError(e);
    }
  }

  public static async rollback<T>(model: Model<T>, data: T): Promise<void> {
    try {
      await DatabaseManager.reap<T>(model);
      await DatabaseManager.seed<T>(model, data);
    } catch (e: unknown) {
      throw ErrroHandler.ensureError(e);
    }
  }
}
