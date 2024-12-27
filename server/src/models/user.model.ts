import { model, Schema } from "mongoose";
interface UserType {
  name: string;
  username: string;
  password: string;
  email: string;
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
  },
  email: {
    type: String,
    required: true,
  },
});
const User = model("User", userSchema);
export default User;

