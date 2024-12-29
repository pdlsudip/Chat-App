import 'dotenv/config'
import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import User from "../models/user.model";
import bcrypt from "bcrypt";
const SECRET_KEY = process.env.SECRET_KEY;
const generateHash = async (password: string) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const signUpUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, name, password, email } = req.body;

    if (!username || !name || !password || !email) {
      res.status(400).json({ msg: "All fields are required" });
      return; 
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ msg: "User already exists. Sign in instead." });
      return;
    }

    const hashedPassword = await generateHash(password);
    const user = await User.create({
      username,
      name,
      password: hashedPassword,
      email,
    });

    res.status(201).json({ msg: "User Created Successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const signInUser = async (req:Request, res:Response) => {

    try {
      const {username, password} = req.body;
      if(!username || !password){
        res.status(401).json({
          msg: "All fields are required"
        })
        return;
      }
      const user =await  User.findOne({
        username
      }) 
      
      if(!user){
        res.status(400).json({
            msg: "User not found "
        })
        return;
      }
      const hashedPassword = await generateHash(password)
      console.log(hashedPassword);
      
      const isPasswordValid = await bcrypt.compare(password, hashedPassword)
      console.log(isPasswordValid)

      if(isPasswordValid){
        const token = jwt.sign({ _id: user._id?.toString(), name: user.name }, SECRET_KEY, {
          expiresIn: '2 days',
        });
        res.cookie("token", token, {
          httpOnly:true
        })
        res.status(200).send({
          msg: "Login Successfully",
          token : token
        })
        return

      }
    } catch (error) {
      res.status(500).json({
        msg: "Internal Server Error"
      })
    }
};
const getInfo = async(req:Request, res:Response) =>{
  res.send("Hello world")
}
export { signUpUser, signInUser, getInfo };
