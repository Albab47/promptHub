import { Schema, model, models } from "mongoose";

const UserScheme = new Schema({
  email: {
    type: String,
    unique: [true, "Email is already exist"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  image: {
    type: String
  }
});

const User = models.User || model("User", UserScheme)

export default User;