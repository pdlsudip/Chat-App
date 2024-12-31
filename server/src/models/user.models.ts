import { model, Schema } from "mongoose";
export interface UserType {
  name: string;
  username: string;
  password: string;
  email: string;
  gender: string;
  profilePic: string;
}

const userSchema = new Schema<UserType>({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  profilePic: {
    type: String,
    default: "",
  },
}, {timestamps:true});
const User = model("User", userSchema);
export default User;
