import { model, Schema } from "mongoose";
const bCrypt = require("bcryptjs");

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password: String) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

export default model("User", userSchema);
