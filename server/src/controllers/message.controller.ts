import { Request, Response } from "express";
import Message from "../models/message.models";
import Conversation from "../models/conversation.models";
const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;

    const senderId = req.user;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()])
    res.json({
        conversation,
        newMessage
    })
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
    console.log("Send error", error.message);
  }
};

const getMessages = async (req:Request, res:Response) =>{
  const {id: receiverId} = req.params;
  const senderId = req.user;

  const conversation = await Conversation.findOne({
   participants: {$all: [senderId, receiverId]}
  }).populate("messages")
  res.status(200).json({
    msg: conversation
  })
}
export { sendMessage, getMessages };
