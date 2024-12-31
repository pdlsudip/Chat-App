import "dotenv/config";
import { Request, Response } from "express";
import User from "../models/user.models";
import bcrypt from "bcrypt";
import generateJwtAndSetCookie from "../utils/generateJwt";
const SECRET_KEY = process.env.SECRET_KEY;
const generateHash = async (password: string) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const signUpUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, name, password, email, gender } = req.body;
    const boyDefaultAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlDefaultAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    if (!username || !name || !password || !email || !gender) {
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
      gender,
      profilePic: gender == "male" ? boyDefaultAvatar : girlDefaultAvatar,
    });

    res
      .status(201)
      .json({
        msg: "User Created Successfully",
        username: user.username,
        profilePic: user.profilePic,
        email: user.email,
        gender: user.gender,
      });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const signInUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(401).json({
        msg: "All fields are required",
      });
      return;
    }
    const user = await User.findOne({
      username,
    })

    if (!user) {
      res.status(400).json({
        msg: "User not found ",
      });
      return;
    }
   const id = user._id
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);
    if (isPasswordValid) {
      generateJwtAndSetCookie(user._id.toString(), res);
      res.status(200).send({
        msg: "Login Successfully",
        id
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};


const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("token", "", { maxAge: 0 }); // Clear the token cookie
    res.status(200).json({ msg: "Logged out successfully" }); // Respond with a success message
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal Server Error" }); // Handle any errors
  }
};
export { signUpUser, signInUser, logout };
