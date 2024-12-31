import { Request, Response } from "express";
import User from "../models/user.models";
export const getUsers = async (req:Request, res:Response) => {
    const currentLoginedId = req.user;
    const filteredUsers = await User.find({
        _id: {$ne : currentLoginedId}
    }).select("-password")
    res.status(200).json({
        filteredUsers
    })
}