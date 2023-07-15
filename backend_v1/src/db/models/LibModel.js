import mongoose from "mongoose";

const LibSchema = new mongoose.Schema(
  {
    prompt: { type: String, required: [true, "A lib requires a prompt"] },
    text: { type: String, required: [true, "A lib requires a text"] },
    numberOfLikes: { type: Number, default: 0 },
    numberOfDislikes: { type: Number, default: 0 },
    numberOfSaves: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Lib = mongoose.model("Lib", LibSchema);
export default Lib;
