import mongoose, { Schema, mongo } from "mongoose";
import { IAdLib } from "../../ts/Interfaces/IAdLibs";
import { AdLibSchema } from "./AdLibModel";
import { IAdLibFeatured } from "../../ts/Interfaces/IAdLibFeatured";

const AdLibFeaturedSchema = new Schema<IAdLib>(
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

const AdLibFeatured = mongoose.model("AdLibFeature", AdLibFeaturedSchema);
export default AdLibFeatured;
