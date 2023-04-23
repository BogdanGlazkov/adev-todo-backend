import { model, Schema } from "mongoose";
import { ITodo } from "../types/types";

const todoSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export default model<ITodo>("Todo", todoSchema);
