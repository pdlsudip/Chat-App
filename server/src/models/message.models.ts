import { model,ObjectId,Schema,Types } from "mongoose";
interface MessageTypes {
    senderId: ObjectId;
    receiverId: ObjectId;
    message: string;
}
const messageSchema = new Schema<MessageTypes>({
    senderId: {
        type: Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId: {
        type: Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true})

const Message = model("Message", messageSchema)
export default Message