import mongoose, { Schema } from "mongoose";
import { IAdLib } from "../../ts/Interfaces/IAdLibs";

const AdLibSchema = new Schema<IAdLib>(
  {
    prompt: { type: String, required: [true, "A lib requires a prompt"] },
    text: { type: String, required: [true, "A lib requires a text"] },
    numberOfLikes: { type: Number, default: 0 },
    numberOfDislikes: { type: Number, default: 0 },
    numberOfSaves: { type: Number, default: 0 },
    isHidden: { type: Boolean, default: false },
    isPG: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const AdLib = mongoose.model("AdLib", AdLibSchema);
export default AdLib;
