import mongoose, { Schema, mongo } from "mongoose";
import { IAdLib } from "../../ts/Interfaces/IAdLibs";
import { AdLibSchema } from "./AdLibModel";
import { IAdLibFeatured } from "../../ts/Interfaces/IAdLibFeatured";

const AdLibFeaturedSchema = new Schema<IAdLibFeatured>(
  {
    adlibs: [AdLibSchema],
  },
  { timestamps: true }
);

const AdLibFeatured = mongoose.model("AdLibFeature", AdLibFeaturedSchema);
export default AdLibFeatured;
