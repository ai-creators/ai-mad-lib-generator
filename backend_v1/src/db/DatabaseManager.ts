import mongoose, { Error, Model, Mongoose } from "mongoose";
import { DatabaseConfig } from "./DatabaseConfig";
import { ErrroHandler } from "../errors/ErrorHandler";

export class DatabaseManager {
  public static connect(dbUri: string): Promise<Mongoose> {
    if (!dbUri) {
      throw new Error(`Database uri provided: "${dbUri}" is no a valid uri`);
    }
    return mongoose.connect(dbUri);
  }

  public static disconnect(): Promise<void> {
    return mongoose.connection.close();
  }

  public static async seed<T>(model: Model<T>, data: T): Promise<void> {
    try {
      await model.create(data);
      console.log("Data successfully injected!");
    } catch (e: unknown) {
      throw ErrroHandler.ensureError(e);
    }
  }

  public static async reap<T>(model: Model<T>): Promise<void> {
    try {
      await model.deleteMany();
      console.log("Data successfully deleted!");
    } catch (e: unknown) {
      throw ErrroHandler.ensureError(e);
    }
  }
}
