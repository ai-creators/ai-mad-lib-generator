import mongoose from "mongoose";
import AdLib from "./db/models/AdLibModel";

mongoose
  .connect(
    "mongodb+srv://adylanmclamb:aObrPxm9xiTWmFks@cluster0.luqakoc.mongodb.net/development?retryWrites=true&w=majority"
  )
  .then(() => {
    return AdLib.updateMany({}, { $set: { isPG: true } });
  })
  .then((res) => {
    console.log("FINISHED: ", res);
  })
  .catch(() => {
    console.log("UH OH");
  });
