import { model, Schema, Types, ObjectId } from "mongoose";
interface ConversationtTypes {
  participants: ObjectId;
  messages: ObjectId;
}
const conversationSchema = new Schema<ConversationtTypes>({
  participants: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: Types.ObjectId,
      ref: "Message",
      default: []
    },
  ],
}, {timestamps:true});

const Conversation = model("conversation", conversationSchema)
export default Conversation