import mongoose from "mongoose";
import AdLib from "./db/models/AdLibModel";

mongoose
  .connect(
    "mongodb+srv://adylanmclamb:tcaR9Op5rZSjbpzh@cluster0.luqakoc.mongodb.net/development?retryWrites=true&w=majority"
  )
  .then(async () => {
    console.log("Connected to MongoDB");

    // Function to update _id fields
    async function updateIds() {
      const cursor = AdLib.find({}).cursor();

      for await (const doc of cursor) {
        const oldId = doc._id;
        const newId = new mongoose.Types.ObjectId(oldId);

        // Create a new document with the new _id
        const newDoc = new AdLib({
          _id: newId,
          prompt: doc.prompt,
          text: doc.text,
          numberOfLikes: doc.numberOfLikes,
          numberOfDislikes: doc.numberOfDislikes,
          numberOfSaves: doc.numberOfSaves,
          isHidden: doc.isHidden,
          isPG: doc.isPG,
        });
        // Remove the old document with the string _id
        await AdLib.deleteOne({ _id: oldId });

        // Save the new document
        await newDoc.save().catch((err) => console.log("ERROR SAVING: ", err));
        console.log("UPDATED: ", newDoc);
      }

      console.log("Update completed");
      mongoose.connection.close();
    }

    await updateIds();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
