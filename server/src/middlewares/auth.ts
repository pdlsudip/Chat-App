declare global {
  namespace Express {
    interface Request {
      token: JwtPayload;
      user: UserType;
    }
  }
}
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { UserType } from "../models/user.models";

// Ensure SECRET_KEY exists and is properly typed
const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error('SECRET_KEY must be defined');
}

// Extending the Request object to include token and user
export interface CustomRequest extends Request {
  token: JwtPayload;
  user: UserType;
}
interface CusotmPayload extends JwtPayload{
  userId: string;
}

export const auth = async (req:CustomRequest, res: Response, next: NextFunction):Promise<void> => {
  try {
    // Extract token from Authorization header or cookies
    const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies.token;
    if (!token) {
      return res.status(401).send('Token not found');
    }

    // Decode the token
    const decoded = jwt.verify(token, SECRET_KEY as string) as CusotmPayload; // Ensure decoded is treated as JwtPayload
    // Retrieve the user based on the decoded userId
    const user = await User.findById(decoded.userId).select("-password");
    
    if (!user) {
      return res.status(401).send('User not found');
    }

    // Attach decoded token and user to the request
    req.token = token;
    req.user = user;


    // Continue to the next middleware or route handler
    next();
  } catch (err) {
     res.status(401).send('Invalid or expired token');
  }
};
