import mongoose, { Model, Mongoose } from "mongoose";
import * as fs from "fs";
import AdLibFeatured from "../models/AdLibFeatured";

export class Seeder {
  public static async batchInsert(
    model: Model<any>,
    jsonPath: string
  ): Promise<void> {
    await Seeder.connect();
    try {
      const formattedData = Seeder.formatData(Seeder.readJsonFile(jsonPath));
      model.insertMany(formattedData);
      console.log("DATA INSERTED");
    } catch (e: any) {
      console.log("ERROR BATCH INSERT: ", e);
    }
  }

  public static formatData(data: any): any {
    data.forEach((item: any) => {
      if (item._id) {
        item._id = new mongoose.Types.ObjectId(item._id);
      }
    });
    return data;
  }

  public static async readJsonFile<T>(path: string): Promise<T | null> {
    return new Promise((resolve, reject) => {
      fs.readFile(path, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading JSON file:", err);
          reject(err);
        }

        try {
          const jsonData: T = JSON.parse(data);
          resolve(jsonData);
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
          reject(parseError);
        }
      });
    });
  }

  public static async connect(): Promise<Mongoose> {
    return await mongoose.connect("");
  }

  public static async disconnect(): Promise<void> {
    return await mongoose.disconnect();
  }
}

if (process.argv[2] === "--import") {
  if (process.argv[3] === "--featured") {
    Seeder.batchInsert(
      AdLibFeatured,
      "../../../../src/db/seeds/AdLibFeaturedData.json"
    );
  }
}
