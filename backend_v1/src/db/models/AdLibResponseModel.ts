import mongoose, { Schema, mongo } from "mongoose";
import { IAdLibResponse } from "../../ts/Interfaces/IAdLibResponse";
import { IAdLibResponseQuestion } from "../../ts/Interfaces/IAdLibResponseQuestion";

const questionSchema = new Schema<IAdLibResponseQuestion>({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const AdLibResponseSchema = new Schema<IAdLibResponse>({
  adlibId: {
    type: String,
    required: [true, "An adlib repsonse requires an adlib id"],
  },
  questions: {
    type: [questionSchema],
    required: true,
  },
});

const AdLibResponse = mongoose.model("AdLibResponse", AdLibResponseSchema);
export default AdLibResponse;
