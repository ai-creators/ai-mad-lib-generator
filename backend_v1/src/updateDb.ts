import mongoose from "mongoose";
import AdLib from "./db/models/AdLibModel";
import fs from "fs";
import path, { format } from "path";

// Connect to mongoose (you might have your own connection details)
mongoose.connect("");

const filePath = path.join(
  "F:",
  "coding",
  "data-storage",
  "ai-adlibs",
  "10-08-2023",
  "production.adlibs.json"
);

// Read JSON data from file
fs.readFile(filePath, "utf8", async (err, jsonString) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  try {
    const data = JSON.parse(jsonString);

    // Assuming the data in the JSON file is an array of objects
    // If the structure is different, you'll have to adjust this part
    const formattedData = data.map((item: any) => {
      // Perform your reformatting here, this is just a dummy example
      const newItem = { ...item };
      if (newItem._id?.$oid) {
        newItem._id = new mongoose.Types.ObjectId(newItem._id.$oid);
      } else {
        newItem._id = new mongoose.Types.ObjectId(newItem._id);
      }
      if (newItem.createdAt?.$date) {
        newItem.createdAt = new Date(newItem.createdAt.$date);
      } else {
        newItem.createdAt = new Date(newItem.createdAt);
      }
      if (newItem.updatedAt?.$date) {
        newItem.updatedAt = new Date(newItem.updatedAt.$date);
      } else {
        newItem.updatedAt = new Date(newItem.updatedAt);
      }
      return newItem;
    });
    console.log("ITEMS: ", formattedData[0]);
    console.log(formattedData.length);
    const CHUNK_SIZE = 50; // Adjust this value based on your requirements
    const chunks = [];
    for (let i = 0; i < formattedData.length; i += CHUNK_SIZE) {
      chunks.push(formattedData.slice(i, i + CHUNK_SIZE));
    }
    for (const chunk of chunks) {
      try {
        await AdLib.insertMany(chunk);
        console.log(`Inserted ${chunk.length} documents.`);
      } catch (error) {
        console.error("Error during chunk insert:", error);
      }
    }
    // AdLib.insertMany(formattedData)
    //   .then((x: any) => {
    //     // console.log("INERTED DATA: ", x.length);
    //   })
    //   .catch((err) => {
    //     // console.log("ERROR: ", err);
    //   });
    console.log("INSERTED CHUNKS");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    mongoose.connection.close();
  }
});

async function bulkInsertWithChunks(docs: any, chunkSize: any) {
  // Split docs into smaller chunks
}

// get the data from F:\coding\data-storage\ai-adlibs\10-08-2023\production.adlibs.json

// turn into an array

// connect to db

// format data

// bulk insert

// (async () => {
//   mongoose
//     .connect(
//       ""
//     )
//     .then(async () => {
//       const formattedData: any = data.map(async (item: any) => {
//         try {
//           const newItem = { ...item };
//           console.log(newItem);
//           console.log("ID: ", newItem._id);
//           if (newItem._id?.$oid) {
//             newItem._id = new mongoose.Types.ObjectId(newItem._id.$oid);
//           } else {
//             newItem._id = new mongoose.Types.ObjectId(newItem._id);
//           }

//           console.log("CREATED AT: ", newItem.createdAt);
//           console.log("UPDATED AT: ", newItem.updatedAt);
//           if (newItem.createdAt?.$date) {
//             newItem.createdAt = new Date(newItem.createdAt.$date);
//           } else {
//             newItem.createdAt = new Date(newItem.createdAt);
//           }
//           if (newItem.updatedAt?.$date) {
//             newItem.updatedAt = new Date(newItem.updatedAt.$date);
//           } else {
//             newItem.updatedAt = new Date(newItem.updatedAt);
//           }
//           //   newItem.createdAt = new Date(parseInt(newItem.createdAt));
//           //   newItem.updatedAt = new Date(parseInt(newItem.updatedAt.$date));

//           return newItem;
//         } catch (error) {
//           console.error("ERROR INSTERTING: ", error);
//         }
//       });
//       console.log("ITEMS: ", formattedData[0]);
//       await AdLib.collection.insertMany(formattedData);
//     })
//     .catch((error) => {
//       console.error("Error connecting to MongoDB:", error);
//     });
// })();

// mongoose
//   .connect(
//     ""
//   )
//   .then((res) => {
//     AdLib.insertMany(data.map((item) => {}));
//   })
//   .catch(console.log);
