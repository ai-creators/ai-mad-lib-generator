import mongoose from "mongoose";
import AdLib from "./db/models/AdLibModel";

mongoose
  .connect("")
  .then(() => {
    return AdLib.updateMany({}, [
      {
        $set: {
          _id: { $convert: { input: "$_id", to: "objectId" } },
        },
      },
    ]);
  })
  .then((res) => {
    console.log("FINISHED: ", res);
  })
  .catch((err) => {
    console.log("UH OH", err);
  });
